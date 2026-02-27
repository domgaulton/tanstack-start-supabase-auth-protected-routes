import { createFileRoute } from "@tanstack/react-router";
import { ReleaseNoteLayout } from "@/components/release-notes/ReleaseNoteLayout";
import { getReleaseByVersion } from "@/data/releases";

const release = getReleaseByVersion("1.3.0");

export const Route = createFileRoute("/(clean-up)/release-notes/v1-3-0")({
	head: () => ({
		meta: [
			{
				title: `v${release.version} — ${release.title} | TanStack Start + Supabase Auth`,
			},
		],
	}),
	component: () => <ReleaseNoteLayout release={release} />,
});
