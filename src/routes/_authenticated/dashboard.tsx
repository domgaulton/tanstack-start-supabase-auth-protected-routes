import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";

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
	const [isRobot, setIsRobot] = useState<boolean | null>(null);

	useEffect(() => {
		if (!user?.id) return;
		supabase
			.from("profiles")
			.select("is_robot")
			.eq("id", user.id)
			.single()
			.then(({ data }) => {
				if (data) setIsRobot(data.is_robot);
			});
	}, [user?.id]);

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
						{isRobot !== null && (
							<p
								data-testid="robot-status"
								className="mt-2 text-muted-foreground"
							>
								{isRobot ? "You are a robot" : "You are not a robot"}
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
