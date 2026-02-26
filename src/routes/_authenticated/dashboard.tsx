import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/_authenticated/dashboard")({
	head: () => ({
		meta: [
			{ title: "Dashboard | TanStack Start + Supabase Auth" },
			{ name: "robots", content: "noindex" },
		],
	}),
	component: DashboardPage,
});

function DashboardPage() {
	const { user } = useAuth();

	const displayName =
		user?.user_metadata?.display_name ?? user?.email ?? "User";

	return (
		<div className="min-h-[calc(100vh-64px)] bg-slate-900 p-6">
			<div className="max-w-2xl mx-auto">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Welcome, {displayName}!</CardTitle>
						<CardDescription>{user?.email}</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							You are on a protected route. Only authenticated users can see
							this page.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
