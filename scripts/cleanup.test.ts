import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
	removeMarkedBlocks,
	transformCiYmlRemoveE2E,
	transformFeaturesRemoveAnalytics,
	transformFooterRemoveDemoPages,
	transformGitignoreRemovePlaywright,
	transformHeaderRemoveDemoPages,
	transformIndexRemoveDemoPages,
	transformPackageJsonRemoveAnalytics,
	transformPackageJsonRemoveCleanup,
	transformPackageJsonRemoveE2E,
	transformPackageJsonRemoveVersion,
	transformRenameInContent,
	transformRootRemoveAnalytics,
	transformVitestConfigRemoveE2E,
} from "./cleanup";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function readFile(relativePath: string): string {
	return readFileSync(join(ROOT, relativePath), "utf-8");
}

describe("removeMarkedBlocks", () => {
	it("removes a single marked block", () => {
		const input = [
			"line 1",
			"// cleanup:foo-start",
			"removed line",
			"// cleanup:foo-end",
			"line 2",
		].join("\n");
		const result = removeMarkedBlocks(input, "foo");
		expect(result).toBe("line 1\nline 2");
	});

	it("removes multiple marked blocks with the same tag", () => {
		const input = [
			"a",
			"// cleanup:bar-start",
			"x",
			"// cleanup:bar-end",
			"b",
			"// cleanup:bar-start",
			"y",
			"// cleanup:bar-end",
			"c",
		].join("\n");
		const result = removeMarkedBlocks(input, "bar");
		expect(result).toBe("a\nb\nc");
	});

	it("leaves content unchanged for non-matching tag", () => {
		const input = [
			"a",
			"// cleanup:foo-start",
			"removed",
			"// cleanup:foo-end",
			"b",
		].join("\n");
		const result = removeMarkedBlocks(input, "other");
		expect(result).toBe(input);
	});

	it("works with JSX comment syntax", () => {
		const input = [
			"<div>",
			"{/* cleanup:demo-start */}",
			"<p>removed</p>",
			"{/* cleanup:demo-end */}",
			"</div>",
		].join("\n");
		const result = removeMarkedBlocks(input, "demo");
		expect(result).toBe("<div>\n</div>");
	});

	it("works with hash comment syntax", () => {
		const input = [
			"line1",
			"# cleanup:e2e-start",
			"# Playwright",
			"/test-results/",
			"# cleanup:e2e-end",
			"line2",
		].join("\n");
		const result = removeMarkedBlocks(input, "e2e");
		expect(result).toBe("line1\nline2");
	});
});

describe("cleanup transforms", () => {
	describe("removeDemoPages", () => {
		it("removes Link import from Footer.tsx", () => {
			const original = readFile("src/components/Footer.tsx");
			expect(original).toContain(
				'import { Link } from "@tanstack/react-router"',
			);

			const result = transformFooterRemoveDemoPages(original);
			expect(result).not.toEqual(original);
			expect(result).not.toContain(
				'import { Link } from "@tanstack/react-router"',
			);
		});

		it("removes release notes <Link> from Footer.tsx", () => {
			const original = readFile("src/components/Footer.tsx");
			expect(original).toContain('to="/release-notes"');
			expect(original).toContain("Release Notes");

			const result = transformFooterRemoveDemoPages(original);
			expect(result).not.toContain('to="/release-notes"');
		});

		it("removes FileText, Info, and Sparkles imports from Header.tsx", () => {
			const original = readFile("src/components/Header.tsx");
			expect(original).toContain("FileText,");
			expect(original).toContain("Info,");
			expect(original).toContain("Sparkles,");

			const result = transformHeaderRemoveDemoPages(original);
			expect(result).not.toEqual(original);
			expect(result).not.toContain("FileText,");
			expect(result).not.toContain("FileText");
			expect(result).not.toContain("Info,");
			expect(result).not.toContain("Sparkles,");
		});

		it("removes About, Features, and Release Notes nav items from Header.tsx", () => {
			const original = readFile("src/components/Header.tsx");
			expect(
				(original.match(/to="\/about"/g) || []).length,
			).toBeGreaterThanOrEqual(2);
			expect(
				(original.match(/to="\/features"/g) || []).length,
			).toBeGreaterThanOrEqual(2);
			expect(
				(original.match(/to="\/release-notes"/g) || []).length,
			).toBeGreaterThanOrEqual(2);

			const result = transformHeaderRemoveDemoPages(original);
			expect(result).not.toContain('to="/about"');
			expect(result).not.toContain('to="/features"');
			expect(result).not.toContain('to="/release-notes"');
			expect(result).not.toContain(">About</span>");
			expect(result).not.toContain(">Features</span>");
			expect(result).not.toContain(">Release Notes</span>");
		});

		it("removes version field from package.json", () => {
			const original = readFile("package.json");
			expect(original).toContain('"version"');

			const result = transformPackageJsonRemoveVersion(original);
			expect(result).not.toEqual(original);
			expect(result).not.toContain('"version"');
			// Verify it's still valid JSON
			expect(() => JSON.parse(result)).not.toThrow();
		});

		it("removes 'See all features' link from index.tsx", () => {
			const original = readFile("src/routes/index.tsx");
			expect(original).toContain("See all features in detail");
			expect(original).toContain('to="/features"');

			const result = transformIndexRemoveDemoPages(original);
			expect(result).not.toContain("See all features in detail");
			expect(result).not.toContain('to="/features"');
		});

		it("removes /about route table row from index.tsx", () => {
			const original = readFile("src/routes/index.tsx");
			expect(original).toContain("/about");
			expect(original).toContain("About this project");

			const result = transformIndexRemoveDemoPages(original);
			expect(result).not.toContain("About this project");
		});

		it("removes /features route table row from index.tsx", () => {
			const original = readFile("src/routes/index.tsx");
			expect(original).toContain("/features");
			expect(original).toContain("Features overview");

			const result = transformIndexRemoveDemoPages(original);
			expect(result).not.toContain("Features overview");
		});

		it("removes dev-only onboarding paragraph from index.tsx", () => {
			const original = readFile("src/routes/index.tsx");
			expect(original).toContain(
				"These onboarding steps are only visible in development",
			);

			const result = transformIndexRemoveDemoPages(original);
			expect(result).not.toContain(
				"These onboarding steps are only visible in development",
			);
			expect(result).not.toContain("Clean up the starter template");
		});

	});

	describe("removeE2ETests", () => {
		it("removes test:e2e scripts from package.json", () => {
			const original = readFile("package.json");
			expect(original).toContain('"test:e2e"');
			expect(original).toContain('"test:e2e:ui"');

			const result = transformPackageJsonRemoveE2E(original);
			expect(result).not.toEqual(original);
			expect(result).not.toContain('"test:e2e"');
			expect(result).not.toContain('"test:e2e:ui"');
			expect(() => JSON.parse(result)).not.toThrow();
		});

		it("removes @playwright/test from package.json", () => {
			const original = readFile("package.json");
			expect(original).toContain('"@playwright/test"');

			const result = transformPackageJsonRemoveE2E(original);
			expect(result).not.toContain('"@playwright/test"');
			expect(() => JSON.parse(result)).not.toThrow();
		});

		it("removes e2e exclude from vitest.config.ts", () => {
			const original = readFile("vitest.config.ts");
			expect(original).toContain('"e2e/**"');

			const result = transformVitestConfigRemoveE2E(original);
			expect(result).not.toEqual(original);
			expect(result).not.toContain('"e2e/**"');
			// node_modules exclude should remain
			expect(result).toContain('"node_modules/**"');
		});

	it("removes e2e steps from ci.yml but keeps migration and build steps", () => {
			const original = readFile(".github/workflows/ci.yml");
			expect(original).toContain("e2e-from-database-changes:");
			expect(original).toContain("e2e:");
			expect(original).toContain("Seed database");
			expect(original).toContain("Run Playwright tests");

			const result = transformCiYmlRemoveE2E(original);
			expect(result).not.toEqual(original);
			// E2E steps should be removed
			expect(result).not.toContain("Seed database");
			expect(result).not.toContain("Run Playwright tests");
			// Standalone e2e job should be removed
			expect(result).not.toContain("\n  e2e:\n");
			// These should remain
			expect(result).toContain("code-quality:");
			expect(result).toContain("detect-database-changes:");
			expect(result).toContain("e2e-from-database-changes:");
			expect(result).toContain("Verify migrations apply cleanly");
			expect(result).toContain("Regenerate types and build");
		});

		it("removes Playwright block from .gitignore", () => {
			const original = readFile(".gitignore");
			expect(original).toContain("# Playwright");
			expect(original).toContain("/test-results/");
			expect(original).toContain("/e2e/.auth/");

			const result = transformGitignoreRemovePlaywright(original);
			expect(result).not.toEqual(original);
			expect(result).not.toContain("# Playwright");
			expect(result).not.toContain("/test-results/");
			expect(result).not.toContain("/e2e/.auth/");
			// Other entries should remain
			expect(result).toContain("node_modules");
		});
	});

	describe("removeAnalytics", () => {
		it("removes Analytics import from __root.tsx", () => {
			const original = readFile("src/routes/__root.tsx");
			expect(original).toContain(
				'import { Analytics } from "@vercel/analytics/react"',
			);

			const result = transformRootRemoveAnalytics(original);
			expect(result).not.toEqual(original);
			expect(result).not.toContain("@vercel/analytics");
		});

		it("removes <Analytics /> from __root.tsx", () => {
			const original = readFile("src/routes/__root.tsx");
			expect(original).toContain("<Analytics />");

			const result = transformRootRemoveAnalytics(original);
			expect(result).not.toContain("<Analytics />");
		});

		it("removes BarChart3 import from features.tsx", () => {
			const original = readFile("src/routes/(clean-up)/features.tsx");
			expect(original).toContain("BarChart3,");

			const result = transformFeaturesRemoveAnalytics(original);
			expect(result).not.toEqual(original);
			expect(result).not.toContain("BarChart3");
		});

		it("removes Vercel Analytics card from features.tsx", () => {
			const original = readFile("src/routes/(clean-up)/features.tsx");
			expect(original).toContain('title: "Vercel Analytics"');

			const result = transformFeaturesRemoveAnalytics(original);
			expect(result).not.toContain('title: "Vercel Analytics"');
			// Other feature cards should remain
			expect(result).toContain('title: "TanStack Start"');
			expect(result).toContain('title: "Supabase Auth"');
		});

		it("removes @vercel/analytics from package.json", () => {
			const original = readFile("package.json");
			expect(original).toContain('"@vercel/analytics"');

			const result = transformPackageJsonRemoveAnalytics(original);
			expect(result).not.toEqual(original);
			expect(result).not.toContain('"@vercel/analytics"');
			expect(() => JSON.parse(result)).not.toThrow();
		});
	});

	describe("selfCleanup", () => {
		it("removes cleanup script and @clack/prompts from package.json", () => {
			const original = readFile("package.json");
			expect(original).toContain('"cleanup"');
			expect(original).toContain('"@clack/prompts"');

			const result = transformPackageJsonRemoveCleanup(original);
			expect(result).not.toEqual(original);
			expect(result).not.toContain('"cleanup"');
			expect(result).not.toContain('"@clack/prompts"');
			expect(() => JSON.parse(result)).not.toThrow();
		});
	});

	describe("renameProject", () => {
		it("replaces package name in content", () => {
			const content = '{ "name": "tanstack-start-supabase-auth" }';
			const result = transformRenameInContent(content, "my-cool-app");
			expect(result).not.toEqual(content);
			expect(result).toContain("my-cool-app");
			expect(result).not.toContain("tanstack-start-supabase-auth");
		});

		it("replaces GitHub repo slug in content", () => {
			const content =
				"https://github.com/domgaulton/tanstack-start-supabase-auth-protected-routes";
			const result = transformRenameInContent(content, "my-cool-app");
			expect(result).not.toEqual(content);
			expect(result).toContain("your-username/my-cool-app");
			expect(result).not.toContain(
				"domgaulton/tanstack-start-supabase-auth-protected-routes",
			);
		});

		it("works against real package.json", () => {
			const original = readFile("package.json");
			expect(original).toContain("tanstack-start-supabase-auth");

			const result = transformRenameInContent(original, "my-app");
			expect(result).not.toEqual(original);
			expect(result).not.toContain("tanstack-start-supabase-auth");
			expect(result).toContain("my-app");
			expect(() => JSON.parse(result)).not.toThrow();
		});
	});
});
