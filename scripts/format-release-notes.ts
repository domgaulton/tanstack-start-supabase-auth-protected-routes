/**
 * Formats release notes from src/data/release-content.ts as GitHub-flavoured markdown.
 *
 * Usage:  npx tsx scripts/format-release-notes.ts <version>
 * Output: markdown written to stdout
 */

import { getReleaseByVersion } from "../src/data/release-content";

const version = process.argv[2];
if (!version) {
	console.error("Usage: npx tsx scripts/format-release-notes.ts <version>");
	process.exit(1);
}

const release = getReleaseByVersion(version);

const lines: string[] = [];

for (const section of release.sections) {
	lines.push(`## ${section.title}`);
	lines.push("");
	for (const item of section.items) {
		lines.push(`- ${item}`);
	}
	lines.push("");
}

if (release.githubIssues?.length) {
	lines.push("---");
	lines.push("");
	const issueLinks = release.githubIssues
		.map(
			(n) =>
				`[#${n}](https://github.com/domgaulton/tanstack-start-supabase-auth-protected-routes/issues/${n})`,
		)
		.join(" ");
	lines.push(`Related issues: ${issueLinks}`);
	lines.push("");
}

process.stdout.write(lines.join("\n"));
