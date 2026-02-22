import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/utils/supabase";

export const Route = createFileRoute("/_authenticated")({
	async beforeLoad() {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			throw redirect({ to: "/login" });
		}
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return <Outlet />;
}
