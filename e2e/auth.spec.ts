import { expect, test } from "@playwright/test";
import { SEED_USER_A, SEED_USER_B, loginAsUser } from "./helpers";

// Auth tests run in unauthenticated context — they test the login flow itself
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Authentication", () => {
	test("login with seeded user shows welcome message", async ({ page }) => {
		await loginAsUser(page, SEED_USER_A.email, SEED_USER_A.password);

		await expect(
			page.getByText(`Welcome, ${SEED_USER_A.displayName}!`),
		).toBeVisible();
	});

	test("login with wrong credentials shows error", async ({ page }) => {
		await page.goto("/login");
		await page.waitForLoadState("networkidle");
		await page.getByLabel("Email").fill(SEED_USER_A.email);
		await page.getByLabel("Password", { exact: true }).fill("wrong-password");
		await page.getByRole("button", { name: "Log in" }).click();

		const alert = page.getByRole("alert");
		await expect(alert).toBeVisible();
		await expect(alert).toContainText("Invalid login credentials");
		expect(page.url()).toContain("/login");
	});

	test("logout redirects to landing page", async ({ page }) => {
		await loginAsUser(page, SEED_USER_A.email, SEED_USER_A.password);

		await page.goto("/logout");
		await page.waitForURL("/");

		await expect(
			page.getByRole("heading", { name: "TanStack Start + Supabase Auth" }),
		).toBeVisible();
	});

	test("unauthenticated user visiting /dashboard is redirected to /login", async ({
		page,
	}) => {
		await page.goto("/dashboard");
		await page.waitForURL("**/login");

		expect(page.url()).toContain("/login");
		await expect(page.getByLabel("Email")).toBeVisible();
	});

	test("Alice (user A) is not a robot", async ({ page }) => {
		await loginAsUser(page, SEED_USER_A.email, SEED_USER_A.password);

		const robotStatus = page.getByTestId("robot-status");
		await expect(robotStatus).toBeVisible();
		await expect(robotStatus).toHaveText("You are not a robot");
	});

	test("Bob (user B) is a robot", async ({ page }) => {
		await loginAsUser(page, SEED_USER_B.email, SEED_USER_B.password);

		const robotStatus = page.getByTestId("robot-status");
		await expect(robotStatus).toBeVisible();
		await expect(robotStatus).toHaveText("You are a robot");
	});

});
