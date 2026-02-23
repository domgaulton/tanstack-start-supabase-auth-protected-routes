import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { hasEnvVars } from "@/utils/env";

export { hasEnvVars };

export function useSetupStatus() {
	const { user, isLoading: isAuthLoading } = useAuth();
	const [isSupabaseReachable, setIsSupabaseReachable] = useState<
		boolean | null
	>(null);

	useEffect(() => {
		if (!hasEnvVars) {
			setIsSupabaseReachable(false);
			return;
		}

		// Hit the auth settings endpoint to verify the active Supabase instance
		// is reachable and the anon key is accepted (getSession is local-only).
		fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/settings`, {
			headers: {
				apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
			},
		})
			.then((res) => setIsSupabaseReachable(res.ok))
			.catch(() => setIsSupabaseReachable(false));
	}, []);

	return {
		hasEnvVars,
		isSupabaseReachable,
		isUserSignedUp: Boolean(user),
		isLoading: isAuthLoading || isSupabaseReachable === null,
	};
}
