# E2E Tests

## Overview

End-to-end tests use [Playwright](https://playwright.dev/) with Chromium. They run against a real local Supabase instance with seeded test data, exercising the full stack from browser to database.

Tests live in the `e2e/` directory and are excluded from Vitest (which handles unit tests).

## Prerequisites

- Supabase running locally (`npm run db:start`)
- Database seeded (`npm run db:seed`)
- `.env` file populated (see root README for environment variable setup)

## Running tests

```bash
# Run all E2E tests (builds the app first, then runs Playwright)
npm run test:e2e

# Run with the Playwright UI (interactive mode)
npm run test:e2e:ui

# List all tests without running them
npx playwright test --list

# Run a specific test file
npx playwright test e2e/auth.spec.ts
```

## Architecture

### Local vs CI configuration

The Playwright config uses different project setups depending on the environment:

- **Locally** — a single `chromium` project runs all tests. Each test handles its own authentication (auth tests start fresh, other tests log in via `beforeEach`). This keeps things simple and works well with Playwright UI mode.
- **In CI** — three projects (`setup`, `authenticated`, `unauthenticated`) optimise for speed. The `setup` project logs in once and saves the session via `storageState`. Authenticated tests reuse the saved session, skipping the login UI entirely.

### Global setup — Supabase connectivity check

Before any tests run, `e2e/global-setup.ts` hits the Supabase REST endpoint (`http://127.0.0.1:54321/rest/v1/`). If Supabase isn't running, the test suite fails immediately with a clear error message instead of cryptic "Failed to fetch" errors throughout the test output.

### CI Playwright projects

In CI, the config defines three projects:

| Project | Purpose | Auth state | Runs |
|---------|---------|------------|------|
| `setup` | Logs in once, saves session to `e2e/.auth/user.json` | Performs fresh login | First, before other projects |
| `authenticated` | Tests that need a logged-in user | Reuses saved session (no UI login) | After `setup` completes |
| `unauthenticated` | Tests that verify login/logout/redirect flows | Empty (no cookies or localStorage) | Independently |

### How storageState works with SSR (CI only)

Supabase auth stores the session in `localStorage`. Playwright's `storageState` persists both cookies and `localStorage`, so the saved state includes Supabase session tokens. When an authenticated test loads a page:

1. The saved localStorage tokens are restored before page load
2. The client-side Supabase SDK picks up the session from localStorage during hydration
3. For tests that need an initial page load to a protected route, navigate to the dashboard first and wait for hydration

SSR `beforeLoad` runs server-side without access to client localStorage, which is why tests navigate to the dashboard and wait for `networkidle` before asserting.

### Test file organisation

```
e2e/
├── global-setup.ts    # Pre-flight Supabase connectivity check
├── auth.setup.ts      # CI setup project — logs in, saves storageState
├── helpers.ts         # Shared utilities (loginAsUser, assertNoFetchError, etc.)
└── auth.spec.ts       # Login, logout, redirect tests
```

### Helpers

`e2e/helpers.ts` exports:

| Export | Description |
|--------|-------------|
| `SEED_USER_A`, `SEED_USER_B` | Seeded test users from `supabase/seed-data.ts` |
| `loginAsUser(page, email, password)` | Logs in via the UI form and waits for dashboard redirect |
| `assertNoFetchError(page)` | Asserts the page doesn't show a "Failed to fetch" error |
| `waitForHydration(page)` | Waits for `networkidle` — use after navigation to ensure React has hydrated |

### Seed data

Test data is defined in `supabase/seed-data.ts` (single source of truth). Both the seed script and E2E helpers import from this file.

| Email | Password | Display Name |
|-------|----------|--------------|
| `user-a@example.com` | `password123` | Alice |
| `user-b@example.com` | `password123` | Bob |

## Writing new tests

### Adding a test that requires authentication

Create a new `.spec.ts` file in `e2e/`. Add a `beforeEach` that logs in locally (CI handles auth via storageState):

```ts
import { expect, test } from "@playwright/test";
import { SEED_USER_A, loginAsUser } from "./helpers";

test.beforeEach(async ({ page }) => {
  if (!process.env.CI) {
    await loginAsUser(page, SEED_USER_A.email, SEED_USER_A.password);
  }
});

test("dashboard shows welcome message", async ({ page }) => {
  await page.goto("/dashboard");
  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("heading", { name: /Welcome/i }),
  ).toBeVisible();
});
```

### Adding an unauthenticated test

If your test needs to start without any auth session (e.g. testing a public page or the login flow), add `test.use()` at the top of the file to clear any existing state:

```ts
import { expect, test } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test("landing page is accessible without auth", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /TanStack Start/i }),
  ).toBeVisible();
});
```

### Tips

- **Wait for hydration** — after `page.goto()`, call `await page.waitForLoadState("networkidle")` before interacting with the page. SSR renders HTML but event handlers aren't attached until React hydrates.
- **Use client-side navigation** — where possible, click links rather than using `page.goto()` for authenticated routes. This preserves the auth session from localStorage.
- **Use seed data constants** — import `SEED_USER_A` / `SEED_USER_B` from `e2e/helpers.ts` rather than hardcoding credentials.
- **Check for fetch errors** — use `assertNoFetchError(page)` after navigations as a safety net for Supabase connectivity issues.

## CI integration

E2E tests run in GitHub Actions after the `code-quality` job (lint, typecheck, unit test, build) passes.

Key CI behaviours:

- A **composite action** (`.github/actions/setup-e2e/action.yml`) handles shared setup (node, npm, Playwright, Supabase CLI, start Supabase, write `.env`)
- Two conditional E2E jobs: **E2E Tests (from detected database changes)** runs when supabase files changed (includes migration check + schema drift), **E2E Tests** runs otherwise
- The `detect-database-changes` job outputs a `skip_e2e` flag — E2E jobs are **skipped** when the branch name, commit message, or PR title contains `no-e2e-test`. This logic is centralised in one place rather than duplicated across jobs.
- Playwright reports are uploaded as artifacts on every run (pass or fail)
- **Concurrency** — a new push to the same branch cancels any in-progress CI run

## Troubleshooting

### "Supabase is not reachable" error

The global setup check failed. Make sure Supabase is running:

```bash
npm run db:start
```

### Tests fail with "Failed to fetch"

Supabase is running but the database may not be seeded, or a service is unhealthy:

```bash
npm run db:reset
npm run db:seed
```

### Auth tests fail with "Invalid login credentials"

The seed data may be stale. Re-seed:

```bash
npm run db:seed
```

### Tests pass locally but fail in CI

- Check the Playwright report artifact in the GitHub Actions run
- CI uses `retries: 2` — if a test is flaky it may pass on retry but still indicate an issue
- CI runs with `workers: 1` (serial) to avoid race conditions with the shared database
- CI uses the three-project setup (setup/authenticated/unauthenticated) while local uses a single `chromium` project — if a test passes locally but fails in CI, check that it works with storageState auth
