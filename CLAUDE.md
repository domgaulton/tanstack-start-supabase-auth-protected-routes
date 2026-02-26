# TanStack Start + Supabase Auth Starter

A production-ready starter template combining TanStack Start (full-stack React SSR framework) with Supabase authentication, protected routes, and shadcn/ui.

This repository should be used as a guide for developers to be able to quickly reach for and create a TanStack Start project, with a Supabase backend. The documentation should be created in a way that allows uers to get started with minimal fuss.

This has been inspired by the NextJs with Supabase example documentation and guide.

- https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
- https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

## Tech Stack

- **Framework**: TanStack Start v1 (React 19, Vite 7, Nitro SSR)
- **Auth & DB**: Supabase (email/password auth, PostgreSQL, RLS)
- **Styling**: Tailwind CSS v4, shadcn/ui (Radix primitives), Lucide icons
- **Code Quality**: Biome (lint/format), TypeScript (strict), Vitest
- **Analytics**: Vercel Analytics (automatic page view tracking)
- **Deployment**: Vercel via GitHub Actions CI/CD

## Project Structure

- `src/routes/` — File-based routing (TanStack Router)
  - `__root.tsx` — Root layout (AuthProvider, Header, Vercel Analytics)
  - `_authenticated.tsx` — Route guard layout (redirects to `/login` if unauthenticated)
  - `_authenticated/dashboard.tsx` — Protected dashboard page
  - `about.tsx` — Public about page with project info and links
  - `features.tsx` — Public features overview with detailed feature grid
  - `release-notes/index.tsx` — Release notes listing page
  - `release-notes/v1-0-0.tsx` etc. — Individual release note pages (use hyphens not dots for TanStack Router)
  - `login.tsx` — Combined login/signup form (includes client-side `useEffect` redirect fallback for SSR)
  - `forgot-password.tsx` / `reset-password.tsx` — Password reset flow
- `src/context/AuthContext.tsx` — React context providing `session`, `user`, `isLoading` via `useAuth()` hook
- `src/utils/supabase.ts` — Supabase client singleton + `getSessionReady()` helper (waits for `INITIAL_SESSION` before checking auth, then delegates to `getSession()` for latest state)
- `src/utils/auth.ts` — `requireAuth()` guard used by protected route layouts (uses `getSessionReady()`)
- `src/utils/clipboard.ts` — `copyToClipboard()` utility for clipboard operations
- `src/hooks/useCopyToClipboard.ts` — React hook wrapping clipboard utility with copied state
- `src/components/Footer.tsx` — Site-wide footer (release notes link, GitHub link)
- `src/components/ui/` — shadcn/ui components (button, card, input, label, alert, dialog, checkbox)
- `src/components/tutorial/` — Onboarding tutorial components (TutorialStep, ConnectSupabaseSteps, SignUpUserSteps)
- `src/hooks/useSetupStatus.ts` — Hook that detects setup progress (env vars, Supabase reachability, user sign-up)
- `src/types/database.types.ts` — Auto-generated Supabase schema types
- `supabase/migrations/` — SQL migrations (profiles table, RLS policies, triggers)
- `supabase/seed-data.ts` — Single source of truth for seed/test user data
- `supabase/seed.ts` — Seed script (imports from seed-data.ts)
- `e2e/` — Playwright E2E tests
- `e2e/auth.spec.ts` — Unauthenticated auth flow tests (login, bad credentials, logout, redirect guard)
- `e2e/auth-redirect.spec.ts` — Authenticated redirect tests (runs under `authenticated` CI project)
- `e2e/helpers.ts` — Shared test utilities (imports seed users from seed-data.ts)
- `playwright.config.ts` — Playwright configuration (local vs CI project setup)
- `vitest.config.ts` — Vitest configuration (excludes `e2e/` directory)

## Key Commands

```bash
npm run dev              # Dev server at http://127.0.0.1:3000
npm run build            # Production build
npm run db:start         # Start local Supabase (Docker)
npm run db:reset         # Migrate + type-gen + seed
npm run db:types         # Regenerate TypeScript types from schema
npm run lint             # Biome lint
npm run format           # Biome format
npm run check            # Lint + format
npm run typecheck        # TypeScript type checking
npm run test             # Vitest unit tests
npm run test:e2e         # Playwright E2E tests
npm run test:e2e:ui      # Playwright E2E tests (interactive UI)
```

## Key Patterns

- **Protected routes** use `_authenticated.tsx` layout with a `beforeLoad` hook that checks auth state and redirects
- **Session initialisation** — `getSessionReady()` in `src/utils/supabase.ts` waits for Supabase's `INITIAL_SESSION` event before calling `getSession()`. This prevents race conditions on fresh page loads where `getSession()` returns `null` before localStorage is restored. All `beforeLoad` guards use this helper via `requireAuth()`. The login page also has a client-side `useEffect` fallback because SSR `beforeLoad` runs server-side without access to localStorage.
- **Auth state** is managed via `AuthContext` — access with `useAuth()` hook anywhere in the component tree
- **Database types** are auto-generated from the Supabase schema — run `npm run db:types` after migration changes
- **Profiles table** is auto-created on signup via a PostgreSQL trigger (`handle_new_user`)
- **RLS policies** ensure users can only read/update their own profile
- **Path alias**: `@/*` maps to `src/*`
- **Homepage tutorial** shows auto-checking checklists that detect setup progress (env vars → Supabase connection → user sign-up). The homepage is always accessible (no auth redirect) for SEO and onboarding

## Environment Variables

- `VITE_SUPABASE_URL` — Supabase API URL
- `VITE_SUPABASE_ANON_KEY` — Public anon key (safe for client)
- `SUPABASE_SECRET_KEY` — Server-side only (seeding, admin operations)

**File convention** (gitignored; `.env.example` and `.env.local.example` are committed):

- `.env` — Hosted/production Supabase credentials (from `.env.example`)
- `.env.local` — Local development overrides, takes precedence over `.env` (from `.env.local.example`)

## Test Users (local dev)

- `user-a@example.com` / `password123` (Alice)
- `user-b@example.com` / `password123` (Bob)
- Local email capture: Mailpit at `http://127.0.0.1:54324`

## Seed Data

Seed data lives in `supabase/seed-data.ts` as the single source of truth. Always reference seed data from this file rather than hardcoding values (in tests, scripts, etc.). Keep `seed-data.ts` and `seed.ts` up to date when schema or test data changes.

## E2E Tests

See `docs/e2e-tests/1-read-me.md` for full documentation. Key points:

- Tests run against a real local Supabase instance
- Local: single `chromium` project, tests handle their own auth
- CI: three projects (`setup`, `authenticated`, `unauthenticated`) with storageState for speed
- Global setup checks Supabase connectivity before running tests
- Branch name, commit message, or PR title containing `no-e2e-test` skips E2E in CI

## Updates made by Claude

- Please ensure documentation found in the repo is also updated alongside changes before processing to commiting or pushing features.
- Please ensure that release notes are created when pushing new features. They should be semantic and claude should auto detect what version to create next. New notes should be added to the `src/routes/release-notes/` file including a link from the `index.ts`

Allow claude to run the following commands;

- npm run typecheck
- npm run check
- npm run lint
- npm run test
- npm run test:e2e
- npx playwright test --list
