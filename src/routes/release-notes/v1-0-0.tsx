import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/release-notes/v1-0-0")({
	head: () => ({
		meta: [
			{ title: "v1.0.0 — Initial Release | TanStack Start + Supabase Auth" },
		],
	}),
	component: ReleaseV100,
});

function ReleaseV100() {
	return (
		<div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<article className="py-20 px-6 max-w-3xl mx-auto">
				<Link
					to="/release-notes"
					className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
				>
					<ArrowLeft size={16} />
					<span className="text-sm">All releases</span>
				</Link>

				<header className="mb-10">
					<span className="text-cyan-400 font-mono font-semibold text-sm">
						v1.0.0
					</span>
					<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-1 mb-2">
						Initial Release
					</h1>
					<time className="text-sm text-gray-500">2026-02-22</time>
				</header>

				<div className="space-y-8">
					<section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
						<h2 className="text-2xl font-bold text-white mb-4">
							Core Framework
						</h2>
						<ul className="space-y-3 text-gray-300">
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									TanStack Start with file-based routing and server-side
									rendering
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									shadcn/ui component library with Tailwind CSS v4
								</span>
							</li>
						</ul>
					</section>

					<section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
						<h2 className="text-2xl font-bold text-white mb-4">
							Authentication
						</h2>
						<ul className="space-y-3 text-gray-300">
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Supabase Auth with email/password sign-up, login, and password
									reset
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Protected routes using{" "}
									<code className="text-cyan-300 bg-slate-700/50 px-1.5 py-0.5 rounded text-sm">
										_authenticated
									</code>{" "}
									layout guard
								</span>
							</li>
						</ul>
					</section>

					<section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
						<h2 className="text-2xl font-bold text-white mb-4">
							User Profiles
						</h2>
						<ul className="space-y-3 text-gray-300">
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									User profiles with auto-creation via PostgreSQL trigger on
									sign-up
								</span>
							</li>
						</ul>
					</section>

					<section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
						<h2 className="text-2xl font-bold text-white mb-4">
							Developer Experience
						</h2>
						<ul className="space-y-3 text-gray-300">
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>GitHub Actions CI/CD pipeline</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>Vercel deployment with analytics integration</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>Biome for linting and formatting</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>Vitest for unit testing</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>Husky pre-commit hooks</span>
							</li>
						</ul>
					</section>
				</div>
			</article>
		</div>
	);
}
