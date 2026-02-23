import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Palette, Zap } from "lucide-react";
import { ConnectSupabaseSteps } from "@/components/tutorial/ConnectSupabaseSteps";
import { DeploymentSteps } from "@/components/tutorial/DeploymentSteps";
import { SignUpUserSteps } from "@/components/tutorial/SignUpUserSteps";
import { Button } from "@/components/ui/button";
import { useSetupStatus } from "@/hooks/useSetupStatus";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	const { isSupabaseReachable } = useSetupStatus();

	const features = [
		{
			icon: <Lock className="w-10 h-10 text-cyan-400" />,
			title: "Supabase Auth",
			description:
				"Email/password authentication with sign-up, login, password reset, and protected routes out of the box.",
		},
		{
			icon: <Zap className="w-10 h-10 text-yellow-400" />,
			title: "TanStack Start",
			description:
				"Full-stack React framework with file-based routing, SSR, and type-safe navigation.",
		},
		{
			icon: <Palette className="w-10 h-10 text-pink-400" />,
			title: "shadcn/ui",
			description:
				"Beautiful, accessible components built with Radix UI and Tailwind CSS. Ready to customize.",
		},
	];

	return (
		<div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<section className="relative py-20 px-6 text-center overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
				<div className="relative max-w-3xl mx-auto space-y-6">
					<h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
						TanStack Start +{" "}
						<span className="text-cyan-400">Supabase Auth</span>
					</h1>
					<p className="text-xl md:text-2xl text-gray-300 font-light">
						A starter template with authentication and protected routes.
					</p>
					<p className="text-lg text-gray-400 max-w-xl mx-auto">
						Sign up, log in, and access protected pages. Built with TanStack
						Start, Supabase, and shadcn/ui.
					</p>
					<div className="pt-4">
						<Button size="lg" asChild>
							<Link to="/login">Get Started</Link>
						</Button>
					</div>
				</div>
			</section>

			<section className="py-12 px-6 max-w-3xl mx-auto space-y-6">
				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
					<ConnectSupabaseSteps />
				</div>
				{isSupabaseReachable === true && (
					<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
						<SignUpUserSteps />
					</div>
				)}
				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
					<DeploymentSteps />
				</div>
			</section>

			<section className="py-16 px-6 max-w-5xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
						>
							<div className="mb-4">{feature.icon}</div>
							<h3 className="text-xl font-semibold text-white mb-3">
								{feature.title}
							</h3>
							<p className="text-gray-400 leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
