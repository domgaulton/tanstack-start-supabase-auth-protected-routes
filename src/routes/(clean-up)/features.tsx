import { createFileRoute, Link } from "@tanstack/react-router";
import {
	BarChart3,
	ExternalLink,
	FileCode,
	Github,
	Lock,
	Palette,
	Rocket,
	Shield,
	TestTube,
	Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/(clean-up)/features")({
	head: () => ({
		meta: [
			{ title: "Features | TanStack Start + Supabase Auth" },
			{
				name: "description",
				content:
					"Explore the features included in this starter template: TanStack Start SSR, Supabase Auth, protected routes, shadcn/ui, Tailwind CSS v4, Biome, Vitest, Vercel Analytics, and Vercel deployment.",
			},
			{
				name: "robots",
				content: "index, follow",
			},
		],
	}),
	component: FeaturesPage,
});

function FeaturesPage() {
	const features = [
		{
			icon: <Zap className="w-10 h-10 text-yellow-400" />,
			title: "TanStack Start",
			description:
				"Full-stack React framework with file-based routing, server-side rendering, and type-safe navigation powered by TanStack Router.",
			link: "https://tanstack.com/start",
		},
		{
			icon: <Lock className="w-10 h-10 text-cyan-400" />,
			title: "Supabase Auth",
			description:
				"Complete email/password authentication with sign-up, login, email confirmation, and password reset flows. Powered by Supabase's GoTrue server.",
			link: "https://supabase.com/docs/guides/auth",
		},
		{
			icon: <Shield className="w-10 h-10 text-green-400" />,
			title: "Protected Routes",
			description:
				"Auth guard layout that automatically redirects unauthenticated users. Uses TanStack Router's beforeLoad hook for server-side checks.",
		},
		{
			icon: <Palette className="w-10 h-10 text-pink-400" />,
			title: "shadcn/ui + Tailwind CSS v4",
			description:
				"Beautiful, accessible components built with Radix UI primitives. Styled with Tailwind CSS v4's utility-first approach. Ready to customize.",
			link: "https://ui.shadcn.com/",
		},
		{
			icon: <FileCode className="w-10 h-10 text-orange-400" />,
			title: "Biome Linting & Formatting",
			description:
				"Fast, unified linting and formatting with Biome. Enforces consistent code style, sorted imports, and accessibility rules out of the box.",
			link: "https://biomejs.dev/",
		},
		{
			icon: <TestTube className="w-10 h-10 text-purple-400" />,
			title: "Vitest Testing",
			description:
				"Vitest testing framework pre-configured and ready to use. Write unit tests for your components and utilities with fast HMR-powered test runs.",
			link: "https://vitest.dev/",
		},
		{
			icon: <Github className="w-10 h-10 text-gray-300" />,
			title: "GitHub Actions CI/CD",
			description:
				"Automated CI pipeline with type checking, linting, formatting, and test runs on every pull request. Deployment pipeline for Vercel included.",
		},
		// cleanup:analytics-start
		{
			icon: <BarChart3 className="w-10 h-10 text-blue-400" />,
			title: "Vercel Analytics",
			description:
				"Built-in page view analytics via @vercel/analytics. Automatically tracks traffic in production with zero configuration required.",
			link: "https://vercel.com/docs/analytics",
		},
		// cleanup:analytics-end
		{
			icon: <Rocket className="w-10 h-10 text-red-400" />,
			title: "Vercel Deployment",
			description:
				"Pre-configured for deployment to Vercel with the Nitro SSR preset. Includes GitHub Actions workflow for automated production deploys.",
			link: "https://vercel.com/",
		},
	];

	return (
		<div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<section className="py-20 px-6 max-w-5xl mx-auto space-y-12">
				<div className="max-w-3xl space-y-4">
					<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
						Features
					</h1>
					<p className="text-xl text-gray-300 font-light">
						Everything you need to build a production-ready full-stack React app
						with authentication, included out of the box.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
						>
							<div className="mb-4">{feature.icon}</div>
							<h3 className="text-xl font-semibold text-white mb-3">
								{feature.title}
							</h3>
							<p className="text-gray-400 leading-relaxed mb-4">
								{feature.description}
							</p>
							{feature.link && (
								<a
									href={feature.link}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
								>
									Learn more
									<ExternalLink className="w-3.5 h-3.5" />
								</a>
							)}
						</div>
					))}
				</div>

				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8 text-center space-y-4">
					<h2 className="text-2xl font-bold text-white">
						Ready to get started?
					</h2>
					<p className="text-gray-400 max-w-xl mx-auto">
						Sign up for an account to explore the protected dashboard, or check
						out the source code on GitHub.
					</p>
					<div className="flex flex-wrap justify-center gap-3 pt-2">
						<Button size="lg" asChild>
							<Link to="/login">Get Started</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<a
								href="https://github.com/domgaulton/tanstack-start-supabase-auth-protected-routes"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Github className="w-5 h-5" />
								GitHub
							</a>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
