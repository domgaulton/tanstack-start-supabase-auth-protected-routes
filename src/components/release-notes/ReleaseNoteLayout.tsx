import type { ReleaseMetadata } from "@/data/releases";
import { ReleaseNoteDetail } from "./ReleaseNoteDetail";
import { ReleaseNoteHeader } from "./ReleaseNoteHeader";

export function ReleaseNoteLayout({ release }: { release: ReleaseMetadata }) {
	return (
		<div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<article className="py-20 px-6 max-w-3xl mx-auto">
				<ReleaseNoteHeader release={release} />
				<div className="space-y-8">
					<ReleaseNoteDetail sections={release.sections} />
				</div>
			</article>
		</div>
	);
}
