import type { Session } from "@supabase/supabase-js";
import { redirect } from "@tanstack/react-router";
import { supabase } from "@/utils/supabase";

/**
 * Checks for an active Supabase session.
 * Throws a redirect to /login if no session exists.
 * Returns the session if authenticated.
 */
export async function requireAuth(): Promise<Session> {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		throw redirect({ to: "/login" });
	}

	return session;
}
