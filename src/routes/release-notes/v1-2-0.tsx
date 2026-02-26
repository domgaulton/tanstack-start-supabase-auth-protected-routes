import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/release-notes/v1-2-0")({
	head: () => ({
		meta: [
			{
				title:
					"v1.2.0 — E2E Testing Infrastructure | TanStack Start + Supabase Auth",
			},
		],
	}),
	component: ReleaseV120,
});

function ReleaseV120() {
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
						v1.2.0
					</span>
					<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-1 mb-2">
						E2E Testing Infrastructure
					</h1>
					<time className="text-sm text-gray-500">2026-02-26</time>
				</header>

				<div className="space-y-8">
					<section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
						<h2 className="text-2xl font-bold text-white mb-4">
							Playwright Test Suite
						</h2>
						<ul className="space-y-3 text-gray-300">
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>Playwright E2E test suite running on Chromium</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Auth tests covering login, bad credentials, logout, and
									redirect guards
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Local/CI split Playwright config — single project locally,
									three projects in CI
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									<code className="text-cyan-300 bg-slate-700/50 px-1.5 py-0.5 rounded text-sm">
										storageState
									</code>{" "}
									auth reuse in CI for faster test runs
								</span>
							</li>
						</ul>
					</section>

					<section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
						<h2 className="text-2xl font-bold text-white mb-4">
							Test Infrastructure
						</h2>
						<ul className="space-y-3 text-gray-300">
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Global setup with Supabase connectivity pre-flight check
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Seed data single source of truth in{" "}
									<code className="text-cyan-300 bg-slate-700/50 px-1.5 py-0.5 rounded text-sm">
										supabase/seed-data.ts
									</code>
								</span>
							</li>
						</ul>
					</section>

					<section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
						<h2 className="text-2xl font-bold text-white mb-4">
							CI/CD Enhancements
						</h2>
						<ul className="space-y-3 text-gray-300">
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>Composite GitHub Action for shared E2E CI setup</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Conditional E2E jobs with and without migration checks
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									<code className="text-cyan-300 bg-slate-700/50 px-1.5 py-0.5 rounded text-sm">
										no-e2e-test
									</code>{" "}
									skip logic via branch name, commit message, or PR title
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									CI concurrency with cancel-in-progress for efficient resource
									usage
								</span>
							</li>
						</ul>
					</section>
				</div>
			</article>
		</div>
	);
}
