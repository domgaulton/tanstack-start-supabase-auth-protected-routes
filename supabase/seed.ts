import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/types/database.types";
import { type SeedUser, seedUsers } from "./seed-data";

const LOCAL_SUPABASE_URL = "http://127.0.0.1:54321";

const SUPABASE_URL = process.env.SUPABASE_URL ?? LOCAL_SUPABASE_URL;
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SECRET_KEY) {
	console.error("Missing SUPABASE_SECRET_KEY in .env");
	console.error(
		"Run `npx supabase status` and copy the Secret key into your .env",
	);
	process.exit(1);
}

console.log(`Seeding against: ${SUPABASE_URL}`);

const supabase = createClient<Database>(SUPABASE_URL, SECRET_KEY, {
	auth: { autoRefreshToken: false, persistSession: false },
});

async function clearExistingUsers(users: SeedUser[]) {
	for (const user of users) {
		const { data } = await supabase.auth.admin.listUsers();
		const existing = data?.users.find((u) => u.email === user.email);
		if (existing) {
			await supabase.auth.admin.deleteUser(existing.id);
			console.log(`  Deleted existing user: ${user.email}`);
		}
	}
}

async function createUser(user: SeedUser) {
	const { data, error } = await supabase.auth.admin.createUser({
		email: user.email,
		password: user.password,
		email_confirm: true,
		user_metadata: { display_name: user.displayName },
	});

	if (error) {
		throw new Error(`Failed to create ${user.email}: ${error.message}`);
	}

	console.log(`  Created user: ${data.user.email} (${data.user.id})`);
}

async function seed() {
	console.log("Clearing existing seed users...");
	await clearExistingUsers(seedUsers);

	console.log("Creating seed users...");
	for (const user of seedUsers) {
		await createUser(user);
	}

	// Verification
	console.log("\nVerification:");

	const { count: profileCount } = await supabase
		.from("profiles")
		.select("*", { count: "exact", head: true });
	console.log(`  Profiles: ${profileCount}`);

	console.log("\nSeeding complete.");
}

seed().catch((err) => {
	console.error("Seed failed:", err);
	process.exit(1);
});
