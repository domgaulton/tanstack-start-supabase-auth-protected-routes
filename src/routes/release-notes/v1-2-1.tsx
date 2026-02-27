import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/release-notes/v1-2-1")({
	head: () => ({
		meta: [
			{
				title:
					"v1.2.1 — OG Image Fix for iMessage | TanStack Start + Supabase Auth",
			},
		],
	}),
	component: ReleaseV121,
});

function ReleaseV121() {
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
						v1.2.1
					</span>
					<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-1 mb-2">
						OG Image Fix for iMessage
					</h1>
					<time className="text-sm text-gray-500">2026-02-27</time>
				</header>

				<div className="space-y-8">
					<section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8">
						<h2 className="text-2xl font-bold text-white mb-4">Bug Fix</h2>
						<ul className="space-y-3 text-gray-300">
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Converted OG image from SVG to PNG — iMessage and most social
									platforms only support raster formats (PNG, JPEG) for Open
									Graph preview cards
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Switched{" "}
									<code className="text-cyan-300 bg-slate-700/50 px-1.5 py-0.5 rounded text-sm">
										og:image
									</code>{" "}
									and{" "}
									<code className="text-cyan-300 bg-slate-700/50 px-1.5 py-0.5 rounded text-sm">
										twitter:image
									</code>{" "}
									from relative paths to absolute URLs for reliable crawler
									resolution
								</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>
									Added{" "}
									<code className="text-cyan-300 bg-slate-700/50 px-1.5 py-0.5 rounded text-sm">
										og:image:type
									</code>{" "}
									and{" "}
									<code className="text-cyan-300 bg-slate-700/50 px-1.5 py-0.5 rounded text-sm">
										og:url
									</code>{" "}
									meta tags for improved Open Graph compliance
								</span>
							</li>
						</ul>
					</section>
				</div>
			</article>
		</div>
	);
}
