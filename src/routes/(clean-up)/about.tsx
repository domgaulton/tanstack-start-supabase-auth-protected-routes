import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/(clean-up)/about")({
	head: () => ({
		meta: [
			{ title: "About | TanStack Start + Supabase Auth" },
			{
				name: "description",
				content:
					"Learn about this production-ready starter template combining TanStack Start with Supabase Auth. Includes protected routes, shadcn/ui, Tailwind CSS v4, and more.",
			},
			{
				name: "robots",
				content: "index, follow",
			},
		],
	}),
	component: AboutPage,
});

function AboutPage() {
	return (
		<div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<section className="py-20 px-6 max-w-3xl mx-auto space-y-12">
				<div className="space-y-4">
					<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
						About This Project
					</h1>
					<p className="text-xl text-gray-300 font-light">
						A production-ready starter template for building full-stack React
						applications with authentication.
					</p>
				</div>

				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8 space-y-4">
					<h2 className="text-2xl font-bold text-white">Why this starter?</h2>
					<p className="text-gray-300 leading-relaxed">
						Getting authentication right in a full-stack React app takes time.
						This starter combines{" "}
						<strong className="text-white">TanStack Start</strong> (a modern
						React SSR framework with file-based routing) and{" "}
						<strong className="text-white">Supabase</strong> (an open-source
						Firebase alternative with PostgreSQL) into a ready-to-go template.
					</p>
					<p className="text-gray-300 leading-relaxed">
						It was inspired by the{" "}
						<a
							href="https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md"
							target="_blank"
							rel="noopener noreferrer"
							className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
						>
							Next.js + Supabase example
						</a>{" "}
						and aims to provide the same level of polish for the TanStack
						ecosystem.
					</p>
				</div>

				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8 space-y-4">
					<h2 className="text-2xl font-bold text-white">What you get</h2>
					<ul className="space-y-3 text-gray-300">
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">Email/password auth</strong> —
								Sign up, login, password reset, and email confirmation flows
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">Protected routes</strong> — Auth
								guard layout that redirects unauthenticated users
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">User profiles</strong> —
								Auto-created via PostgreSQL trigger with Row Level Security
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">Modern tooling</strong> — Biome
								linting, Vitest testing, GitHub Actions CI/CD, Vercel deployment
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-cyan-400 mt-1">&#x2022;</span>
							<span>
								<strong className="text-white">Beautiful UI</strong> — shadcn/ui
								components with Tailwind CSS v4
							</span>
						</li>
					</ul>
				</div>

				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8 space-y-4">
					<h2 className="text-2xl font-bold text-white">Links</h2>
					<div className="flex flex-wrap gap-4">
						<Button variant="outline" asChild>
							<a
								href="https://github.com/domgaulton/tanstack-start-supabase-auth-protected-routes"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Github className="w-5 h-5" />
								GitHub Repository
							</a>
						</Button>
						<Button variant="outline" asChild>
							<a
								href="https://tanstack.com/start"
								target="_blank"
								rel="noopener noreferrer"
							>
								<ExternalLink className="w-5 h-5" />
								TanStack Start Docs
							</a>
						</Button>
						<Button variant="outline" asChild>
							<a
								href="https://supabase.com/docs"
								target="_blank"
								rel="noopener noreferrer"
							>
								<ExternalLink className="w-5 h-5" />
								Supabase Docs
							</a>
						</Button>
					</div>
				</div>
			</section>
		</div>
	)
}
