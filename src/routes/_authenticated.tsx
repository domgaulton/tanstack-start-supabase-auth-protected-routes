import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireAuth } from "@/utils/auth";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: () => requireAuth(),
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return <Outlet />;
}
