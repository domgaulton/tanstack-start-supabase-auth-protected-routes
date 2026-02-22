import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase";

export const Route = createFileRoute("/logout")({
	component: LogoutPage,
});

function LogoutPage() {
	const navigate = useNavigate();

	useEffect(() => {
		supabase.auth.signOut().then(() => {
			navigate({ to: "/" });
		});
	}, [navigate]);

	return (
		<div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
			<p className="text-muted-foreground">Signing out...</p>
		</div>
	);
}
