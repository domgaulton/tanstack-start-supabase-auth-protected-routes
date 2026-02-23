import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { hasEnvVars } from "@/utils/env";

export { hasEnvVars };

function isLocalUrl(url: string) {
	return /^https?:\/\/(localhost|127\.0\.0\.1)/i.test(url);
}

export function useSetupStatus() {
	const { user, isLoading: isAuthLoading } = useAuth();
	const [isHostedReachable, setIsHostedReachable] = useState<boolean | null>(
		null,
	);
	const [isLocalReachable, setIsLocalReachable] = useState<boolean | null>(
		null,
	);

	useEffect(() => {
		if (!hasEnvVars) {
			setIsHostedReachable(false);
			setIsLocalReachable(false);
			return;
		}

		const url = import.meta.env.VITE_SUPABASE_URL;
		const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

		const checkUrl = (targetUrl: string) =>
			fetch(`${targetUrl}/auth/v1/settings`, { headers: { apikey: key } })
				.then((res) => res.ok)
				.catch(() => false);

		if (isLocalUrl(url)) {
			// Active URL is local (.env.local overrides) — only check local.
			checkUrl(url).then((ok) => {
				setIsLocalReachable(ok);
				setIsHostedReachable(false);
			});
		} else {
			// Active URL is hosted — only check hosted.
			// We can't validate local with the hosted anon key.
			checkUrl(url).then((ok) => {
				setIsHostedReachable(ok);
				setIsLocalReachable(false);
			});
		}
	}, []);

	const isSupabaseReachable =
		(isHostedReachable ?? false) || (isLocalReachable ?? false);

	return {
		hasEnvVars,
		isSupabaseReachable,
		isHostedReachable: isHostedReachable ?? false,
		isLocalReachable: isLocalReachable ?? false,
		isUserSignedUp: Boolean(user),
		isLoading: isAuthLoading || isHostedReachable === null,
	};
}
