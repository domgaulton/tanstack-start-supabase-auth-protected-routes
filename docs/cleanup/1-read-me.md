# Cleanup Script

## Overview

The cleanup script is an interactive CLI that helps you strip out optional features from the starter template and rename the project — all in one go. It leaves you with a clean codebase containing only the features you need.

Run it with:

```bash
npm run cleanup
```

## What it does

The script asks four questions:

1. **Project name** — renames references in `package.json`, config files, and source code
2. **Remove starter template files?** (yes/no) — strips out demo pages and analytics
3. **Remove automatic releases?** (yes/no) — strips out the GitHub release workflow and version field
4. **Remove e2e tests?** (yes/no) — strips out Playwright and CI e2e jobs

Database migration checks in CI are **not configurable** — they always remain.

After your selections, it applies all changes and runs `npm install` to sync dependencies.

## What gets removed

### Demo Pages (question 2)

Removes the `(clean-up)/` route group, supporting data/components, and analytics:

| Deleted | Description |
|---------|-------------|
| `src/routes/(clean-up)/` | Entire pathless route group (about, features, release notes pages) |
| `src/data/release-content.ts` | Release note content data |
| `src/data/releases.ts` | Release metadata (versions, dates, links) |
| `src/components/release-notes/` | Shared release note layout, header, and detail components |

Also modifies:

| File | Change |
|------|--------|
| `src/components/Footer.tsx` | Removes the release notes `<Link>` and its import |
| `src/components/Header.tsx` | Removes About, Features, and Release Notes nav links plus `FileText`, `Info`, `Sparkles` icon imports |
| `src/routes/index.tsx` | Removes "See all features in detail" link, `/about` and `/features` route table rows, and the dev-only onboarding paragraph |
| `src/routes/__root.tsx` | Removes `<Analytics />` component and its import |
| `package.json` | Removes `@vercel/analytics` dependency |

### Automatic Releases (question 3)

Removes the GitHub release workflow:

| Deleted | Description |
|---------|-------------|
| `.github/workflows/release.yml` | GitHub Action that auto-creates releases on merge |
| `scripts/format-release-notes.ts` | Release notes formatting script |

Also modifies:

| File | Change |
|------|--------|
| `package.json` | Removes the `version` field (no longer needed without the release workflow) |

### E2E Tests (question 4)

Removes Playwright E2E test infrastructure:

| Deleted | Description |
|---------|-------------|
| `e2e/` | All E2E test files and helpers |
| `playwright.config.ts` | Playwright configuration |
| `.github/actions/setup-e2e/` | Composite action for CI E2E setup |
| `docs/e2e-tests/` | E2E test documentation |

Also modifies:

| File | Change |
|------|--------|
| `package.json` | Removes `test:e2e`, `test:e2e:ui` scripts and `@playwright/test` dependency |
| `vitest.config.ts` | Removes `e2e/**` from the exclude list |
| `.github/workflows/ci.yml` | Removes the standalone `e2e` job and E2E steps from `database-build` (keeps `code-quality`, `detect-database-changes`, `migration-check`, and database build/integration steps) |
| `.gitignore` | Removes the Playwright section |

## How it works

The script uses **marker comments** in source files (`cleanup:TAG-start` / `cleanup:TAG-end`) to identify removable blocks. A `removeMarkedBlocks(content, tag)` helper scans lines and drops everything between matching markers (inclusive). This approach is comment-syntax-agnostic — it works with `//`, `{/* */}`, and `#` comments.

Simple single-line transforms (import members, JSON fields) still use direct string replacements where they're not fragile.

Key design decisions:

- **Marker-based removal** — no fragile regexes that break when formatting changes; markers survive Biome/Prettier reformats
- **Pure functions** — all transforms are exported and unit-tested independently against real source files
- **Idempotent** — safe to run multiple times; `existsSync` guards prevent errors on already-deleted files
- **Order-independent** — feature removals don't interfere with each other
- **Automatic `npm install`** — runs after all changes to sync the lock file

## The `(clean-up)` route group

The `src/routes/(clean-up)/` directory uses TanStack Router's **pathless route group** convention. Parenthesised directory names group files logically without affecting URL paths:

```
src/routes/(clean-up)/
├── about.tsx           → serves /about
├── features.tsx        → serves /features
└── release-notes/
    ├── index.tsx       → serves /release-notes
    ├── v1-0-0.tsx      → serves /release-notes/v1-0-0
    └── ...
```

The name `(clean-up)` signals that the entire directory is removable via the cleanup script as a single operation.

## Testing

The cleanup transforms are tested in `scripts/cleanup.test.ts` using Vitest. Tests read the real source files and verify that each transform correctly removes the targeted content without breaking the rest of the file.

```bash
npm run test
```

## Adding new removable content

To add new content that the cleanup script removes:

1. Add `cleanup:TAG-start` / `cleanup:TAG-end` marker comments around the removable block in the source file
2. Create a `transformXxx(content: string): string` function in `scripts/cleanup.ts` that calls `removeMarkedBlocks(content, "TAG")`
3. Wire it into the appropriate `removeXxx()` function
4. Export the transform and add tests in `scripts/cleanup.test.ts`
