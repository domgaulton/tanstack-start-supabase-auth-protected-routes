/**
 * Interactive cleanup script for the starter template.
 *
 * Lets users remove optional features (demo pages, e2e tests, analytics)
 * and rename the project — all in one go.
 *
 * Usage:  npx tsx scripts/cleanup.ts   (or:  npm run cleanup)
 */

import { execSync } from "node:child_process";
import {
	existsSync,
	readFileSync,
	readdirSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as p from "@clack/prompts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// ── Pure transform functions (exported for testing) ──────────────────────────

// Remove all lines between cleanup:TAG-start and cleanup:TAG-end markers
// (inclusive). Comment-syntax-agnostic — works with //, JSX comments, and #.
export function removeMarkedBlocks(content: string, tag: string): string {
	const startMarker = `cleanup:${tag}-start`;
	const endMarker = `cleanup:${tag}-end`;
	const lines = content.split("\n");
	const result: string[] = [];
	let removing = false;
	for (const line of lines) {
		if (line.includes(startMarker)) {
			removing = true;
			continue;
		}
		if (removing && line.includes(endMarker)) {
			removing = false;
			continue;
		}
		if (!removing) {
			result.push(line);
		}
	}
	return result.join("\n");
}

export function transformFooterRemoveDemoPages(content: string): string {
	let result = content;
	// Remove the Link import
	result = result.replace(
		'import { Link } from "@tanstack/react-router";\n\n',
		"",
	);
	// Remove the release notes Link block (marked with cleanup:demo-pages comments)
	result = removeMarkedBlocks(result, "demo-pages");
	return result;
}

export function transformHeaderRemoveDemoPages(content: string): string {
	let result = content;
	// Remove FileText, Info, Sparkles from import
	result = result.replace("\tFileText,\n", "");
	result = result.replace("\tInfo,\n", "");
	result = result.replace("\tSparkles,\n", "");
	// Remove About, Features, and Release Notes nav links (marked with cleanup:demo-pages comments)
	result = removeMarkedBlocks(result, "demo-pages");
	return result;
}

export function transformIndexRemoveDemoPages(content: string): string {
	// Remove marked demo page blocks (features link, /about row, /features row, dev paragraph)
	return removeMarkedBlocks(content, "demo-pages");
}

export function transformPackageJsonRemoveVersion(content: string): string {
	return content.replace(/\s+"version": "[^"]+",\n/, "\n");
}

export function transformPackageJsonRemoveE2E(content: string): string {
	let result = content;
	result = result.replace(/\s+"test:e2e": "[^"]+",\n/, "\n");
	result = result.replace(/\s+"test:e2e:ui": "[^"]+",\n/, "\n");
	result = result.replace(/\s+"@playwright\/test": "[^"]+",\n/, "\n");
	return result;
}

export function transformVitestConfigRemoveE2E(content: string): string {
	return content.replace('"e2e/**", ', "");
}

export function transformCiYmlRemoveE2E(content: string): string {
	let result = removeMarkedBlocks(content, "e2e");
	result = result.replace(
		"name: E2E Tests + Database Migration (if detected)",
		"name: Test Database Migrations (if detected)",
	);
	return result;
}

export function transformGitignoreRemovePlaywright(content: string): string {
	return removeMarkedBlocks(content, "e2e");
}

export function transformRootRemoveAnalytics(content: string): string {
	let result = content;
	result = result.replace(
		'import { Analytics } from "@vercel/analytics/react";\n',
		"",
	);
	// Remove <Analytics /> component (marked with cleanup:analytics comments)
	result = removeMarkedBlocks(result, "analytics");
	return result;
}

export function transformFeaturesRemoveAnalytics(content: string): string {
	let result = content;
	// Remove BarChart3 from import
	result = result.replace("\tBarChart3,\n", "");
	// Remove the Vercel Analytics feature card (marked with cleanup:analytics comments)
	result = removeMarkedBlocks(result, "analytics");
	return result;
}

export function transformPackageJsonRemoveAnalytics(content: string): string {
	return content.replace(/\s+"@vercel\/analytics": "[^"]+",\n/, "\n");
}

export function transformPackageJsonRemoveCleanup(content: string): string {
	let result = content;
	result = result.replace(/\s+"cleanup": "[^"]+",\n/, "\n");
	result = result.replace(/\s+"@clack\/prompts": "[^"]+",\n/, "\n");
	return result;
}

export function transformRenameInContent(
	content: string,
	newName: string,
): string {
	const oldPkgName = "tanstack-start-supabase-auth";
	const oldRepoSlug =
		"domgaulton/tanstack-start-supabase-auth-protected-routes";
	let result = content;
	// Replace repo slug first (more specific) before the package name (substring of the slug)
	result = result.replaceAll(oldRepoSlug, `your-username/${newName}`);
	result = result.replaceAll(oldPkgName, newName);
	return result;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function read(relativePath: string): string {
	return readFileSync(join(ROOT, relativePath), "utf-8");
}

function write(relativePath: string, content: string): void {
	writeFileSync(join(ROOT, relativePath), content, "utf-8");
}

function remove(relativePath: string): void {
	const target = join(ROOT, relativePath);
	if (existsSync(target)) {
		rmSync(target, { recursive: true, force: true });
	}
}

function removeDirIfEmpty(relativePath: string): void {
	const target = join(ROOT, relativePath);
	if (existsSync(target)) {
		const entries = readdirSync(target);
		if (entries.length === 0) {
			rmSync(target, { recursive: true, force: true });
		}
	}
}

// ── Feature removal functions ────────────────────────────────────────────────

function removeDemoPages(): void {
	// Delete files and directories
	remove("src/routes/(clean-up)");
	remove("src/data/release-content.ts");
	remove("src/data/releases.ts");
	remove("src/components/release-notes");

	// Modify Footer.tsx — remove Link import and release notes link
	if (existsSync(join(ROOT, "src/components/Footer.tsx"))) {
		write(
			"src/components/Footer.tsx",
			transformFooterRemoveDemoPages(read("src/components/Footer.tsx")),
		);
	}

	// Modify Header.tsx — remove About, Features, Release Notes nav items and icon imports
	if (existsSync(join(ROOT, "src/components/Header.tsx"))) {
		write(
			"src/components/Header.tsx",
			transformHeaderRemoveDemoPages(read("src/components/Header.tsx")),
		);
	}

	// Modify index.tsx — remove features link, route table rows, and dev paragraph
	if (existsSync(join(ROOT, "src/routes/index.tsx"))) {
		write(
			"src/routes/index.tsx",
			transformIndexRemoveDemoPages(read("src/routes/index.tsx")),
		);
	}
}

function removeReleases(): void {
	remove(".github/workflows/release.yml");
	remove("scripts/format-release-notes.ts");

	// Remove version field from package.json (no longer needed without release workflow)
	if (existsSync(join(ROOT, "package.json"))) {
		write(
			"package.json",
			transformPackageJsonRemoveVersion(read("package.json")),
		);
	}
}

function removeE2ETests(): void {
	// Delete files and directories
	remove("e2e");
	remove("playwright.config.ts");
	remove("docs/e2e-tests");
	removeDirIfEmpty("docs");

	// Modify package.json — remove e2e scripts and playwright dependency
	if (existsSync(join(ROOT, "package.json"))) {
		write("package.json", transformPackageJsonRemoveE2E(read("package.json")));
	}

	// Modify vitest.config.ts — remove e2e from exclude
	if (existsSync(join(ROOT, "vitest.config.ts"))) {
		write(
			"vitest.config.ts",
			transformVitestConfigRemoveE2E(read("vitest.config.ts")),
		);
	}

	// Modify ci.yml — remove e2e-related jobs (keep only code-quality)
	if (existsSync(join(ROOT, ".github/workflows/ci.yml"))) {
		write(
			".github/workflows/ci.yml",
			transformCiYmlRemoveE2E(read(".github/workflows/ci.yml")),
		);
	}

	// Modify .gitignore — remove Playwright block
	if (existsSync(join(ROOT, ".gitignore"))) {
		write(
			".gitignore",
			transformGitignoreRemovePlaywright(read(".gitignore")),
		);
	}
}

function removeAnalytics(): void {
	// Modify __root.tsx — remove Analytics import and component
	if (existsSync(join(ROOT, "src/routes/__root.tsx"))) {
		write(
			"src/routes/__root.tsx",
			transformRootRemoveAnalytics(read("src/routes/__root.tsx")),
		);
	}

	// Modify features.tsx — remove the Vercel Analytics feature card and BarChart3 import
	if (existsSync(join(ROOT, "src/routes/(clean-up)/features.tsx"))) {
		write(
			"src/routes/(clean-up)/features.tsx",
			transformFeaturesRemoveAnalytics(
				read("src/routes/(clean-up)/features.tsx"),
			),
		);
	}

	// Modify package.json — remove @vercel/analytics from dependencies
	if (existsSync(join(ROOT, "package.json"))) {
		write(
			"package.json",
			transformPackageJsonRemoveAnalytics(read("package.json")),
		);
	}
}

function renameProject(newName: string): void {
	const filesToRename = [
		"package.json",
		".cta.json",
		"supabase/config.toml",
		"src/components/Footer.tsx",
		"src/routes/(clean-up)/about.tsx",
		"src/routes/index.tsx",
		"src/routes/(clean-up)/features.tsx",
	];

	// If release notes still exist, also rename in those files
	const releaseNoteFiles = [
		"src/routes/(clean-up)/release-notes/index.tsx",
		"src/components/release-notes/ReleaseNoteHeader.tsx",
		"scripts/format-release-notes.ts",
	];
	for (const f of releaseNoteFiles) {
		if (existsSync(join(ROOT, f))) {
			filesToRename.push(f);
		}
	}

	for (const file of filesToRename) {
		if (!existsSync(join(ROOT, file))) continue;
		write(file, transformRenameInContent(read(file), newName));
	}
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
	p.intro("Project Cleanup");

	const currentName: string =
		JSON.parse(read("package.json")).name ?? "my-app";

	const projectName = await p.text({
		message: "What is your project name?",
		placeholder: currentName,
		defaultValue: currentName,
		validate(value) {
			if (!value || !/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(value)) {
				return "Must be lowercase alphanumeric with hyphens (e.g. my-app)";
			}
		},
	});

	if (p.isCancel(projectName)) {
		p.cancel("Cancelled.");
		process.exit(0);
	}

	const willCleanup = await p.confirm({
		message: "Remove starter template files? (demo pages, analytics)",
	});

	if (p.isCancel(willCleanup)) {
		p.cancel("Cancelled.");
		process.exit(0);
	}

	const willRemoveReleases = await p.confirm({
		message: "Remove automatic releases? (GitHub release workflow)",
	});

	if (p.isCancel(willRemoveReleases)) {
		p.cancel("Cancelled.");
		process.exit(0);
	}

	const willRemoveE2E = await p.confirm({
		message: "Remove e2e tests? (Playwright, CI e2e jobs)",
	});

	if (p.isCancel(willRemoveE2E)) {
		p.cancel("Cancelled.");
		process.exit(0);
	}

	const willRename = projectName !== currentName;

	if (!willRename && !willCleanup && !willRemoveReleases && !willRemoveE2E) {
		p.outro("Nothing to do.");
		return;
	}

	const s = p.spinner();

	if (willCleanup) {
		s.start("Removing demo pages...");
		removeDemoPages();
		s.stop("Removed demo pages.");

		s.start("Removing analytics...");
		removeAnalytics();
		s.stop("Removed analytics.");
	}

	if (willRemoveReleases) {
		s.start("Removing automatic releases...");
		removeReleases();
		s.stop("Removed automatic releases.");
	}

	if (willRemoveE2E) {
		s.start("Removing e2e tests...");
		removeE2ETests();
		s.stop("Removed e2e tests.");
	}

	if (willRename) {
		s.start("Renaming project...");
		renameProject(projectName);
		s.stop(`Renamed to "${projectName}".`);
	}

	// Remove the cleanup script itself, its tests, docs, and dependencies
	s.start("Removing cleanup script...");
	remove("scripts/cleanup.ts");
	remove("scripts/cleanup.test.ts");
	remove("docs/cleanup");
	removeDirIfEmpty("docs");
	if (existsSync(join(ROOT, "package.json"))) {
		write(
			"package.json",
			transformPackageJsonRemoveCleanup(read("package.json")),
		);
	}
	s.stop("Removed cleanup script.");

	s.start("Running npm install...");
	execSync("npm install", { cwd: ROOT, stdio: "ignore" });
	s.stop("Dependencies synced.");

	s.start("Regenerating route tree and building...");
	execSync("npm run build", { cwd: ROOT, stdio: "ignore" });
	s.stop("Route tree regenerated and build verified.");

	s.start("Formatting code...");
	execSync("npx biome check --write", { cwd: ROOT, stdio: "ignore" });
	s.stop("Code formatted.");

	const summary: string[] = [];
	if (willCleanup) {
		summary.push("removed starter template files");
	}
	if (willRemoveReleases) {
		summary.push("removed automatic releases");
	}
	if (willRemoveE2E) {
		summary.push("removed e2e tests");
	}
	if (willRename) {
		summary.push(`renamed to "${projectName}"`);
	}

	p.outro(`Done! ${summary.join(", ")}.`);
}

// Only run when executed directly, not when imported by tests
const isDirectRun = process.argv[1]?.endsWith("cleanup.ts");
if (isDirectRun) {
	main().catch((err) => {
		p.cancel("An error occurred.");
		console.error(err);
		process.exit(1);
	});
}
