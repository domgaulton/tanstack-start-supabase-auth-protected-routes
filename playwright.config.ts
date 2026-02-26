import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: isCI,
	retries: isCI ? 2 : 0,
	workers: isCI ? 1 : undefined,
	reporter: isCI ? "github" : "html",
	globalSetup: "./e2e/global-setup.ts",

	use: {
		baseURL: "http://localhost:3000",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},

	projects: isCI
		? [
				{
					name: "setup",
					testMatch: /auth\.setup\.ts/,
					use: { ...devices["Desktop Chrome"] },
				},
				{
					name: "authenticated",
					dependencies: ["setup"],
					testIgnore: /auth\.spec\.ts/,
					use: {
						...devices["Desktop Chrome"],
						storageState: "e2e/.auth/user.json",
					},
				},
				{
					name: "unauthenticated",
					testMatch: /auth\.spec\.ts/,
					use: {
						...devices["Desktop Chrome"],
						storageState: { cookies: [], origins: [] },
					},
				},
			]
		: [
				{
					name: "chromium",
					use: { ...devices["Desktop Chrome"] },
				},
			],

	webServer: {
		command: isCI
			? "node .output/server/index.mjs"
			: "npm run build && node .output/server/index.mjs",
		url: "http://localhost:3000",
		reuseExistingServer: !isCI,
		timeout: 120_000,
	},
});
