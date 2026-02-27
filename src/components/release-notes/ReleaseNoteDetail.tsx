import type { ReleaseSection } from "@/data/releases";

function renderInlineCode(text: string) {
	const parts = text.split(/(`[^`]+`)/g);
	return parts.map((part) => {
		if (part.startsWith("`") && part.endsWith("`")) {
			return (
				<code
					key={part}
					className="text-cyan-300 bg-slate-700/50 px-1.5 py-0.5 rounded text-sm"
				>
					{part.slice(1, -1)}
				</code>
			);
		}
		return part;
	});
}

export function ReleaseNoteDetail({
	sections,
}: {
	sections: ReleaseSection[];
}) {
	return (
		<>
			{sections.map((section) => (
				<section
					key={section.title}
					className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8"
				>
					<h2 className="text-2xl font-bold text-white mb-4">
						{section.title}
					</h2>
					<ul className="space-y-3 text-gray-300">
						{section.items.map((item) => (
							<li key={item} className="flex items-start gap-2">
								<span className="text-cyan-400 mt-1">&#x2022;</span>
								<span>{renderInlineCode(item)}</span>
							</li>
						))}
					</ul>
				</section>
			))}
		</>
	);
}
