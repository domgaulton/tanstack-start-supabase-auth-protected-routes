/**
 * Pre-flight check — verifies Supabase is reachable before any tests run.
 * Fails fast with a clear message instead of cryptic "Failed to fetch" errors.
 */
async function globalSetup() {
	const supabaseUrl =
		process.env.VITE_SUPABASE_URL ?? "http://127.0.0.1:54321";

	try {
		const res = await fetch(`${supabaseUrl}/rest/v1/`, {
			method: "HEAD",
			signal: AbortSignal.timeout(5_000),
		});

		if (!res.ok) {
			throw new Error(`Supabase responded with status ${res.status}`);
		}
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		throw new Error(
			`Supabase is not reachable at ${supabaseUrl}.\n` +
				`Make sure Supabase is running: npx supabase start\n` +
				`Original error: ${message}`,
		);
	}
}

export default globalSetup;
