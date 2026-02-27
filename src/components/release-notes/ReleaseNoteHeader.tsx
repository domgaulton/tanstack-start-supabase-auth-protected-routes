import { Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { ReleaseMetadata } from "@/data/releases";

export function ReleaseNoteHeader({ release }: { release: ReleaseMetadata }) {
	return (
		<>
			<Link
				to="/release-notes"
				className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
			>
				<ArrowLeft size={16} />
				<span className="text-sm">All releases</span>
			</Link>

			<header className="mb-10">
				<span className="text-cyan-400 font-mono font-semibold text-sm">
					v{release.version}
				</span>
				<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-1 mb-2">
					{release.title}
				</h1>
				<div className="flex items-center gap-4">
					<time className="text-sm text-gray-500">{release.date}</time>
					{release.githubIssues?.map((issue) => (
						<a
							key={issue}
							href={`https://github.com/domgaulton/tanstack-start-supabase-auth-protected-routes/issues/${issue}`}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
						>
							#{issue}
							<ExternalLink className="w-3 h-3" />
						</a>
					))}
				</div>
			</header>
		</>
	);
}
