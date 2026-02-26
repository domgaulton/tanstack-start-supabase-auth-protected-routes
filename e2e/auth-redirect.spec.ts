import { expect, test } from "@playwright/test";
import { SEED_USER_A, loginAsUser } from "./helpers";

test.describe("Authenticated redirects", () => {
	test.beforeEach(async ({ page }) => {
		// In CI the authenticated project provides storageState, but locally
		// we use a single chromium project so we need to log in via UI.
		if (!process.env.CI) {
			await loginAsUser(page, SEED_USER_A.email, SEED_USER_A.password);
		}
	});

	test("authenticated user visiting /login is redirected to /dashboard", async ({
		page,
	}) => {
		await page.goto("/login");
		await page.waitForURL("**/dashboard");

		expect(page.url()).toContain("/dashboard");
	});
});
