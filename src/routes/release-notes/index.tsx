import { createFileRoute, Link } from "@tanstack/react-router";
import type { FileRoutesByTo } from "@/routeTree.gen";
import { ArrowLeft, ExternalLink, Tag } from "lucide-react";

const releases: {
	version: string;
	date: string;
	title: string;
	path: keyof FileRoutesByTo;
}[] = [
	{
		version: "1.2.0",
		date: "2026-02-26",
		title: "E2E Testing Infrastructure",
		path: "/release-notes/v1-2-0",
	},
	{
		version: "1.1.0",
		date: "2026-02-23",
		title: "Onboarding Docs Added",
		path: "/release-notes/v1-1-0",
	},
	{
		version: "1.0.0",
		date: "2026-02-22",
		title: "Initial Release",
		path: "/release-notes/v1-0-0",
	},
];

export const Route = createFileRoute("/release-notes/")({
	head: () => ({
		meta: [
			{ title: "Release Notes | TanStack Start + Supabase Auth" },
			{
				name: "description",
				content: "A history of what's new in TanStack Start + Supabase Auth.",
			},
		],
	}),
	component: ReleaseNotesIndex,
});

function ReleaseNotesIndex() {
	return (
		<div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<section className="py-20 px-6 max-w-3xl mx-auto">
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
				>
					<ArrowLeft size={16} />
					<span className="text-sm">Back to home</span>
				</Link>

				<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
					Release Notes
				</h1>
				<p className="text-xl text-gray-300 font-light mb-4">
					A history of what's new in this project.
				</p>
				<a
					href="https://github.com/domgaulton/tanstack-start-supabase-auth-protected-routes/releases"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-10"
				>
					View on GitHub
					<ExternalLink className="w-4 h-4" />
				</a>

				<div className="space-y-4">
					{releases.map((release) => (
						<Link
							key={release.version}
							to={release.path}
							className="block bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
						>
							<div className="flex items-start justify-between gap-4">
								<div>
									<div className="flex items-center gap-2 mb-1">
										<Tag size={16} className="text-cyan-400" />
										<span className="text-cyan-400 font-mono font-semibold">
											v{release.version}
										</span>
									</div>
									<h2 className="text-xl font-semibold text-white">
										{release.title}
									</h2>
								</div>
								<time className="text-sm text-gray-500 whitespace-nowrap">
									{release.date}
								</time>
							</div>
						</Link>
					))}
				</div>
			</section>
		</div>
	);
}
