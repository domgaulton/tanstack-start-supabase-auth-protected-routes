import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { hasEnvVars } from "@/utils/env";
import { supabase } from "@/utils/supabase";

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

		supabase.auth
			.getSession()
			.then(() => setIsSupabaseReachable(true))
			.catch(() => setIsSupabaseReachable(false));
	}, []);

	return {
		hasEnvVars,
		isSupabaseReachable,
		isUserSignedUp: Boolean(user),
		isLoading: isAuthLoading || isSupabaseReachable === null,
	};
}
