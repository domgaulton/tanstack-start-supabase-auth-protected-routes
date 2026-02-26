import { expect, test } from "@playwright/test";
import { SEED_USER_A, loginAsUser } from "./helpers";

test.describe("Authenticated redirects", () => {
	test("authenticated user visiting /login is redirected to /dashboard", async ({
		page,
	}) => {
		await loginAsUser(page, SEED_USER_A.email, SEED_USER_A.password);

		// Trigger a client-side navigation to /login. We inject an <a> click
		// rather than using page.goto() because a full page reload races with
		// Supabase restoring the session from localStorage — beforeLoad calls
		// getSession() before the session is available. TanStack Router
		// intercepts <a> clicks and navigates client-side, keeping the
		// in-memory session intact.
		await page.evaluate(() => {
			const a = document.createElement("a");
			a.href = "/login";
			document.body.appendChild(a);
			a.click();
		});
		await page.waitForURL("**/dashboard");

		expect(page.url()).toContain("/dashboard");
	});
});
