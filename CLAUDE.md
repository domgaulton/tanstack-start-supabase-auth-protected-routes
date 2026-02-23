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
  - `login.tsx` — Combined login/signup form
  - `forgot-password.tsx` / `reset-password.tsx` — Password reset flow
- `src/context/AuthContext.tsx` — React context providing `session`, `user`, `isLoading` via `useAuth()` hook
- `src/utils/supabase.ts` — Supabase client singleton
- `src/utils/auth.ts` — `requireAuth()` guard used by protected route layouts
- `src/utils/clipboard.ts` — `copyToClipboard()` utility for clipboard operations
- `src/hooks/useCopyToClipboard.ts` — React hook wrapping clipboard utility with copied state
- `src/components/ui/` — shadcn/ui components (button, card, input, label, alert, dialog, checkbox)
- `src/components/tutorial/` — Onboarding tutorial components (TutorialStep, ConnectSupabaseSteps, SignUpUserSteps)
- `src/hooks/useSetupStatus.ts` — Hook that detects setup progress (env vars, Supabase reachability, user sign-up)
- `src/types/database.types.ts` — Auto-generated Supabase schema types
- `supabase/migrations/` — SQL migrations (profiles table, RLS policies, triggers)
- `supabase/seed.ts` — Test user seeding

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
```

## Key Patterns

- **Protected routes** use `_authenticated.tsx` layout with a `beforeLoad` hook that checks auth state and redirects
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

## Updates made by Claude

- Please ensure documentation found in the repo is also updated alongside changes before processing to commiting or pushing features.

Allow claude to run the following commands;

- npm run typecheck
- npm run check
- npm run lint
- npm run test
