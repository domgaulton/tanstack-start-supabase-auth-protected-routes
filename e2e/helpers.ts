import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { seedUsers } from "../supabase/seed-data";

/** Seeded users — single source of truth from supabase/seed-data.ts */
export const SEED_USER_A = seedUsers[0];
export const SEED_USER_B = seedUsers[1];

/**
 * Log in via the UI login form and wait for redirect to the dashboard.
 * Waits for network idle after navigation to ensure React has hydrated
 * before interacting with the form (SSR renders the HTML but event
 * handlers aren't attached until hydration completes).
 */
export async function loginAsUser(
	page: Page,
	email: string,
	password: string,
) {
	await page.goto("/login");
	await page.waitForLoadState("networkidle");
	await page.getByLabel("Email").fill(email);
	await page.getByLabel("Password").fill(password);
	await page.getByRole("button", { name: "Log in" }).click();
	await page.waitForURL("**/dashboard");
}

/**
 * Assert the page does not contain a "Failed to fetch" error.
 * Use as a safety net after navigations to catch Supabase connectivity issues.
 */
export async function assertNoFetchError(page: Page) {
	await expect(page.getByText("Failed to fetch")).not.toBeVisible();
}

/**
 * Wait for client-side hydration to complete.
 * Wraps waitForLoadState("networkidle") with a descriptive name.
 */
export async function waitForHydration(page: Page) {
	await page.waitForLoadState("networkidle");
}
