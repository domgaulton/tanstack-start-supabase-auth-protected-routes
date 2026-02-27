import { createFileRoute } from "@tanstack/react-router";
import { ReleaseNoteLayout } from "@/components/release-notes/ReleaseNoteLayout";
import { getReleaseByVersion } from "@/data/releases";

const release = getReleaseByVersion("1.2.1");

export const Route = createFileRoute("/release-notes/v1-2-1")({
	head: () => ({
		meta: [
			{
				title: `v${release.version} — ${release.title} | TanStack Start + Supabase Auth`,
			},
		],
	}),
	component: () => <ReleaseNoteLayout release={release} />,
});
