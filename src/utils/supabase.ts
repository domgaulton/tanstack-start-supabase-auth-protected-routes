import type { Session } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

// Fallbacks allow the app to boot and render the setup guide when env vars
// are not yet configured. The client won't be functional, but the app won't crash.
export const supabase = createClient<Database>(
	import.meta.env.VITE_SUPABASE_URL || "http://localhost",
	import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder",
);

/**
 * Returns the current session after Supabase has finished restoring from localStorage.
 *
 * On a fresh page load, `supabase.auth.getSession()` can return `null` if called
 * before the auth client has initialised. This helper waits for the
 * `INITIAL_SESSION` event first, then delegates to `getSession()` so it always
 * returns the latest session (including after login/logout).
 *
 * Safe to call multiple times — the initialisation wait resolves immediately
 * after the first `INITIAL_SESSION` event.
 */
let initPromise: Promise<void> | null = null;

export async function getSessionReady(): Promise<Session | null> {
	if (!initPromise) {
		initPromise = new Promise<void>((resolve) => {
			const {
				data: { subscription },
			} = supabase.auth.onAuthStateChange((event) => {
				if (event === "INITIAL_SESSION") {
					resolve();
					subscription.unsubscribe();
				}
			});
		});
	}
	await initPromise;
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session;
}
