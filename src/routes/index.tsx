import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ExternalLink,
	Github,
	Lock,
	Palette,
	Rocket,
	Shield,
	Zap,
} from "lucide-react";
import { ConnectSupabaseSteps } from "@/components/tutorial/ConnectSupabaseSteps";
import { DeploymentSteps } from "@/components/tutorial/DeploymentSteps";
import { SignUpUserSteps } from "@/components/tutorial/SignUpUserSteps";
import { Button } from "@/components/ui/button";
import { useSetupStatus } from "@/hooks/useSetupStatus";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{
				title:
					"TanStack Start + Supabase Auth | Production-Ready Starter Template",
			},
			{
				name: "description",
				content:
					"Get started quickly with TanStack Start and Supabase Auth. Includes email/password authentication, protected routes, user profiles, password reset, shadcn/ui, Tailwind CSS v4, and Vercel deployment.",
			},
		],
	}),
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
		{
			icon: <Shield className="w-10 h-10 text-green-400" />,
			title: "Protected Routes",
			description:
				"Auth guard layout with automatic redirects. Uses TanStack Router's beforeLoad hook for server-side checks.",
		},
		{
			icon: <Github className="w-10 h-10 text-gray-300" />,
			title: "GitHub Actions CI/CD",
			description:
				"Automated pipeline with type checking, linting, and tests on every PR. Vercel deployment included.",
		},
		{
			icon: <Rocket className="w-10 h-10 text-red-400" />,
			title: "Production Ready",
			description:
				"Biome linting, Vitest testing, Husky pre-commit hooks, and Vercel deployment config out of the box.",
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
						A production-ready starter template combining TanStack Start (React
						SSR framework) with Supabase Auth.
					</p>
					<p className="text-lg text-gray-400 max-w-2xl mx-auto">
						Includes email/password authentication, protected routes, user
						profiles, password reset flow, shadcn/ui components, Tailwind CSS
						v4, Biome linting, Vitest, GitHub Actions CI/CD, and Vercel
						deployment config.
					</p>
					<div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
						{[
							"react",
							"typescript",
							"tanstack-start",
							"tanstack-router",
							"supabase",
							"supabase-auth",
							"authentication",
							"protected-routes",
							"shadcn-ui",
							"tailwindcss",
							"vite",
							"ssr",
							"biome",
							"vitest",
							"github-actions",
							"cicd",
							"vercel",
							"starter-template",
							"boilerplate",
						].map((topic) => (
							<span
								key={topic}
								className="px-3 py-1 text-xs font-medium rounded-full bg-slate-700/60 text-gray-300 border border-slate-600"
							>
								{topic}
							</span>
						))}
					</div>
					<div className="pt-4 flex items-center justify-center gap-3">
						<Button size="lg" asChild>
							<Link to="/dashboard">Dashboard</Link>
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

			{import.meta.env.DEV && (
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
					<p className="text-sm text-gray-500 text-center">
						Once you're set up, you can safely delete the{" "}
						<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-400">
							src/components/tutorial/
						</code>{" "}
						folder and remove these steps from your homepage. The{" "}
						<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-400">
							/about
						</code>{" "}
						and{" "}
						<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-400">
							/features
						</code>{" "}
						pages can also be updated or removed to suit your project.
					</p>
				</section>
			)}

			<section className="py-16 px-6 max-w-5xl mx-auto space-y-6">
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
				<div className="text-center">
					<Link
						to="/features"
						className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
					>
						See all features in detail
						<ExternalLink className="w-4 h-4" />
					</Link>
				</div>
			</section>

			<section className="py-16 px-6 max-w-5xl mx-auto space-y-12">
				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
					<h2 className="text-2xl font-bold text-white mb-6">
						What's Included
					</h2>
					<ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">TanStack Start</strong> —
								Full-stack React with file-based routing and SSR
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">Supabase Auth</strong> —
								Email/password authentication
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">Protected routes</strong> — Auth
								guard layout with redirect
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">shadcn/ui</strong> —
								Pre-configured Radix UI components
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">Tailwind CSS v4</strong> —
								Utility-first styling
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">Biome</strong> — Linting and
								formatting
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">Vitest</strong> — Testing
								framework
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">CI/CD</strong> — GitHub Actions
								for checks and deployment
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">Husky</strong> — Pre-commit hooks
							</span>
						</li>
					</ul>
				</div>

				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
					<h2 className="text-2xl font-bold text-white mb-6">Routes</h2>
					<div className="overflow-x-auto">
						<table className="w-full text-left">
							<thead>
								<tr className="border-b border-slate-700">
									<th className="py-3 pr-4 text-sm font-semibold text-gray-300">
										Route
									</th>
									<th className="py-3 text-sm font-semibold text-gray-300">
										Description
									</th>
								</tr>
							</thead>
							<tbody className="text-gray-400">
								<tr className="border-b border-slate-700/50">
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											/
										</code>
									</td>
									<td className="py-3">Landing page</td>
								</tr>
								<tr className="border-b border-slate-700/50">
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											/login
										</code>
									</td>
									<td className="py-3">Sign in / sign up</td>
								</tr>
								<tr className="border-b border-slate-700/50">
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											/logout
										</code>
									</td>
									<td className="py-3">Signs out and redirects to /</td>
								</tr>
								<tr className="border-b border-slate-700/50">
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											/forgot-password
										</code>
									</td>
									<td className="py-3">Request a password reset email</td>
								</tr>
								<tr className="border-b border-slate-700/50">
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											/reset-password
										</code>
									</td>
									<td className="py-3">Set a new password (via email link)</td>
								</tr>
								<tr className="border-b border-slate-700/50">
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											/about
										</code>
									</td>
									<td className="py-3">About this project</td>
								</tr>
								<tr className="border-b border-slate-700/50">
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											/features
										</code>
									</td>
									<td className="py-3">Features overview</td>
								</tr>
								<tr>
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											/dashboard
										</code>
									</td>
									<td className="py-3">
										Protected — requires authentication otherwise redirects to
										/login
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
					<h2 className="text-2xl font-bold text-white mb-6">Key Files</h2>
					<div className="overflow-x-auto">
						<table className="w-full text-left">
							<thead>
								<tr className="border-b border-slate-700">
									<th className="py-3 pr-4 text-sm font-semibold text-gray-300">
										File
									</th>
									<th className="py-3 text-sm font-semibold text-gray-300">
										Purpose
									</th>
								</tr>
							</thead>
							<tbody className="text-gray-400">
								<tr className="border-b border-slate-700/50">
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											src/routes/__root.tsx
										</code>
									</td>
									<td className="py-3">
										Root layout with AuthProvider and Header
									</td>
								</tr>
								<tr className="border-b border-slate-700/50">
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											src/routes/_authenticated.tsx
										</code>
									</td>
									<td className="py-3">
										Auth guard layout for protected routes
									</td>
								</tr>
								<tr className="border-b border-slate-700/50">
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											src/routes/_authenticated/dashboard.tsx
										</code>
									</td>
									<td className="py-3">Example protected page</td>
								</tr>
								<tr className="border-b border-slate-700/50">
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											src/context/AuthContext.tsx
										</code>
									</td>
									<td className="py-3">React context for auth state</td>
								</tr>
								<tr>
									<td className="py-3 pr-4">
										<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
											src/utils/supabase.ts
										</code>
									</td>
									<td className="py-3">Supabase client singleton</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
					<h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
					<ol className="space-y-4 text-gray-300">
						<li className="flex items-start gap-3">
							<span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">
								1
							</span>
							<div>
								<p className="text-white font-medium">Install dependencies</p>
								<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
									npm install
								</code>
							</div>
						</li>
						<li className="flex items-start gap-3">
							<span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">
								2
							</span>
							<div>
								<p className="text-white font-medium">
									Start local Supabase (requires Docker)
								</p>
								<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
									npm run db:start
								</code>
							</div>
						</li>
						<li className="flex items-start gap-3">
							<span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">
								3
							</span>
							<div>
								<p className="text-white font-medium">Copy environment files</p>
								<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
									cp .env.example .env && cp .env.local.example .env.local
								</code>
							</div>
						</li>
						<li className="flex items-start gap-3">
							<span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">
								4
							</span>
							<div>
								<p className="text-white font-medium">
									Reset database, generate types, and seed
								</p>
								<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
									npm run db:reset
								</code>
							</div>
						</li>
						<li className="flex items-start gap-3">
							<span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">
								5
							</span>
							<div>
								<p className="text-white font-medium">Start dev server</p>
								<code className="bg-slate-900 rounded px-2 py-1 text-sm font-mono text-cyan-400">
									npm run dev
								</code>
							</div>
						</li>
					</ol>
				</div>

				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
					<h2 className="text-2xl font-bold text-white mb-6">Learn More</h2>
					<div className="flex flex-wrap gap-4">
						<a
							href="https://tanstack.com/start"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
						>
							TanStack Start
							<ExternalLink className="w-4 h-4" />
						</a>
						<a
							href="https://supabase.com/docs"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
						>
							Supabase Docs
							<ExternalLink className="w-4 h-4" />
						</a>
						<a
							href="https://ui.shadcn.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
						>
							shadcn/ui
							<ExternalLink className="w-4 h-4" />
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
