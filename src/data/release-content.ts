export interface ReleaseSection {
	title: string;
	items: string[];
}

export interface ReleaseContentData {
	version: string;
	date: string;
	title: string;
	path: string;
	githubIssues?: number[];
	sections: ReleaseSection[];
}

export const releases: ReleaseContentData[] = [
	{
		version: "1.4.0",
		date: "2026-02-27",
		title: "Project Cleanup Script",
		path: "/release-notes/v1-4-0",
		githubIssues: [38],
		sections: [
			{
				title: "Interactive Cleanup CLI",
				items: [
					"Added `npm run cleanup` — interactive script to strip optional features from the starter template",
					"Users can remove release notes, E2E tests, and Vercel Analytics with a single command",
					"Includes project renaming with slug replacement across `package.json`, `.cta.json`, `supabase/config.toml`, and source files",
				],
			},
			{
				title: "How It Works",
				items: [
					"Built with `@clack/prompts` for a polished CLI experience with spinners and confirmations",
					"Each feature removal cleanly deletes files, strips imports/JSX, updates CI workflows, and removes dependencies",
					"Runs `npm install` automatically after changes to sync the lockfile",
				],
			},
		],
	},
	{
		version: "1.3.0",
		date: "2026-02-27",
		title: "Release Notes Single Source of Truth",
		path: "/release-notes/v1-3-0",
		githubIssues: [31, 33],
		sections: [
			{
				title: "Release Metadata Single Source of Truth",
				items: [
					"Centralized release metadata in `src/data/releases.ts` — version, date, title, and GitHub issues defined once",
					"Shared `ReleaseNoteLayout` component replaces duplicated layout and header markup across all release pages",
					"GitHub issue links displayed on each release note page with support for multiple issues per release",
				],
			},
			{
				title: "Automated Git Tagging",
				items: [
					"Added `version` field to `package.json`",
					"GitHub Actions workflow automatically creates a GitHub Release and git tag when the version in `package.json` is bumped",
					"Idempotent — merges to main that don't bump the version are no-ops",
				],
			},
		],
	},
	{
		version: "1.2.1",
		date: "2026-02-27",
		title: "OG Image Fix for iMessage",
		path: "/release-notes/v1-2-1",
		githubIssues: [34],
		sections: [
			{
				title: "Bug Fix",
				items: [
					"Converted OG image from SVG to PNG — iMessage and most social platforms only support raster formats (PNG, JPEG) for Open Graph preview cards",
					"Switched `og:image` and `twitter:image` from relative paths to absolute URLs for reliable crawler resolution",
					"Added `og:image:type` and `og:url` meta tags for improved Open Graph compliance",
				],
			},
		],
	},
	{
		version: "1.2.0",
		date: "2026-02-26",
		title: "E2E Testing Infrastructure",
		path: "/release-notes/v1-2-0",
		githubIssues: [30],
		sections: [
			{
				title: "Playwright Test Suite",
				items: [
					"Playwright E2E test suite running on Chromium",
					"Auth tests covering login, bad credentials, logout, and redirect guards",
					"Local/CI split Playwright config — single project locally, three projects in CI",
					"`storageState` auth reuse in CI for faster test runs",
				],
			},
			{
				title: "Test Infrastructure",
				items: [
					"Global setup with Supabase connectivity pre-flight check",
					"Seed data single source of truth in `supabase/seed-data.ts`",
				],
			},
			{
				title: "CI/CD Enhancements",
				items: [
					"Composite GitHub Action for shared E2E CI setup",
					"Conditional E2E jobs with and without migration checks",
					"`no-e2e-test` skip logic via branch name, commit message, or PR title",
					"CI concurrency with cancel-in-progress for efficient resource usage",
				],
			},
		],
	},
	{
		version: "1.1.0",
		date: "2026-02-23",
		title: "Onboarding Docs Added",
		path: "/release-notes/v1-1-0",
		sections: [
			{
				title: "Onboarding Guides",
				items: [
					"Added onboarding guide to help new users get started with the project",
					"Vercel deployment documentation and support",
				],
			},
			{
				title: "Production Ready",
				items: ["Production-readiness enhancements across the template"],
			},
		],
	},
	{
		version: "1.0.0",
		date: "2026-02-22",
		title: "Initial Release",
		path: "/release-notes/v1-0-0",
		sections: [
			{
				title: "Core Framework",
				items: [
					"TanStack Start with file-based routing and server-side rendering",
					"shadcn/ui component library with Tailwind CSS v4",
				],
			},
			{
				title: "Authentication",
				items: [
					"Supabase Auth with email/password sign-up, login, and password reset",
					"Protected routes using `_authenticated` layout guard",
				],
			},
			{
				title: "User Profiles",
				items: [
					"User profiles with auto-creation via PostgreSQL trigger on sign-up",
				],
			},
			{
				title: "Developer Experience",
				items: [
					"GitHub Actions CI/CD pipeline",
					"Vercel deployment with analytics integration",
					"Biome for linting and formatting",
					"Vitest for unit testing",
					"Husky pre-commit hooks",
				],
			},
		],
	},
];

export function getReleaseByVersion(version: string): ReleaseContentData {
	const release = releases.find((r) => r.version === version);
	if (!release) {
		throw new Error(`Release ${version} not found`);
	}
	return release;
}
