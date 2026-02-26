import { test as setup } from "@playwright/test";
import { SEED_USER_A, loginAsUser } from "./helpers";

const authFile = "e2e/.auth/user.json";

setup("authenticate", async ({ page }) => {
	await loginAsUser(page, SEED_USER_A.email, SEED_USER_A.password);
	await page.context().storageState({ path: authFile });
});
