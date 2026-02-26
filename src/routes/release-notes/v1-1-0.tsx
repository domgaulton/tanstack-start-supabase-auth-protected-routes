import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/release-notes/v1-1-0")({
	head: () => ({
		meta: [
			{
				title:
					"v1.1.0 — Onboarding Docs Added | TanStack Start + Supabase Auth",
			},
		],
	}),
	component: ReleaseV110,
});

function ReleaseV110() {
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
						v1.1.0
					</span>
					<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-1 mb-2">
						Onboarding Docs Added
					</h1>
					<time className="text-sm text-gray-500">2026-02-23</time>
				</header>

				<div className="space-y-8">
					<section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
						<h2 className="text-2xl font-bold text-white mb-4">
							Onboarding Guides
						</h2>
						<ul className="space-y-3 text-gray-300">
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Added onboarding guide to help new users get started with the
									project
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Vercel deployment documentation and support
								</span>
							</li>
						</ul>
					</section>

					<section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
						<h2 className="text-2xl font-bold text-white mb-4">
							Production Ready
						</h2>
						<ul className="space-y-3 text-gray-300">
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Production-readiness enhancements across the template
								</span>
							</li>
						</ul>
					</section>
				</div>
			</article>
		</div>
	);
}
