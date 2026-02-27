import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	BarChart3,
	Check,
	Cog,
	Copy,
	FileText,
	FolderTree,
	Scissors,
	Sparkles,
	Terminal,
	TestTube,
	Trash2,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

function CopyBlock({ text }: { text: string }) {
	const { copied, copy: handleCopy } = useCopyToClipboard(text);

	return (
		<div className="relative">
			<pre className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-sm text-gray-300">
				<code>{text}</code>
			</pre>
			<button
				type="button"
				onClick={handleCopy}
				className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
				aria-label="Copy command to clipboard"
			>
				{copied ? (
					<Check className="size-4 text-green-400" />
				) : (
					<Copy className="size-4" />
				)}
			</button>
		</div>
	);
}

function InlineCode({ children }: { children: ReactNode }) {
	return (
		<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
			{children}
		</code>
	);
}

export const Route = createFileRoute("/(clean-up)/cleanup")({
	head: () => ({
		meta: [
			{ title: "Cleanup Script | TanStack Start + Supabase Auth" },
			{
				name: "description",
				content:
					"Learn about the interactive cleanup script that strips demo pages, e2e tests, and analytics from the starter template so you can start fresh.",
			},
			{
				name: "robots",
				content: "index, follow",
			},
		],
	}),
	component: CleanupPage,
});

function FeatureItem({
	path,
	description,
}: {
	path?: string;
	description: string;
}) {
	return (
		<li className="flex items-start gap-2">
			<span className="text-cyan-400 mt-0.5 shrink-0">&#x2022;</span>
			<span>
				{path && (
					<>
						<InlineCode>{path}</InlineCode> —{" "}
					</>
				)}
				{description}
			</span>
		</li>
	);
}

function RemovableFeatures() {
	return (
		<div className="grid grid-cols-1 gap-6">
			<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-4">
				<div className="mb-2">
					<FileText className="w-8 h-8 text-cyan-400" />
				</div>
				<h3 className="text-lg font-semibold text-white">Demo Pages</h3>
				<p className="text-sm text-gray-400">
					about, features, release notes, data, components
				</p>
				<ul className="space-y-2 text-sm text-gray-400">
					<FeatureItem
						path="src/routes/(clean-up)/"
						description="entire pathless route group"
					/>
					<FeatureItem
						path="src/data/releases.ts"
						description="release metadata & content"
					/>
					<FeatureItem
						path="src/components/release-notes/"
						description="shared layout components"
					/>
					<FeatureItem description="Footer & Header nav links to demo pages" />
					<FeatureItem
						path=".github/workflows/release.yml"
						description="auto-release workflow"
					/>
				</ul>
			</div>

			<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-4">
				<div className="mb-2">
					<TestTube className="w-8 h-8 text-purple-400" />
				</div>
				<h3 className="text-lg font-semibold text-white">E2E Tests</h3>
				<p className="text-sm text-gray-400">Playwright, CI jobs, docs</p>
				<ul className="space-y-2 text-sm text-gray-400">
					<FeatureItem path="e2e/" description="all test files and helpers" />
					<FeatureItem
						path="playwright.config.ts"
						description="Playwright configuration"
					/>
					<FeatureItem
						path=".github/actions/setup-e2e/"
						description="CI composite action"
					/>
					<FeatureItem path="docs/e2e-tests/" description="E2E documentation" />
					<FeatureItem description="CI workflow E2E jobs (keeps code-quality only)" />
				</ul>
			</div>

			<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-4">
				<div className="mb-2">
					<BarChart3 className="w-8 h-8 text-blue-400" />
				</div>
				<h3 className="text-lg font-semibold text-white">Vercel Analytics</h3>
				<p className="text-sm text-gray-400">tracking code, dependency</p>
				<ul className="space-y-2 text-sm text-gray-400">
					<FeatureItem description="<Analytics /> component from root layout" />
					<FeatureItem
						path="@vercel/analytics"
						description="dependency from package.json"
					/>
					<FeatureItem description="Analytics feature card from the features page" />
				</ul>
			</div>
		</div>
	);
}

function CleanupPage() {
	return (
		<div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<section className="py-20 px-6 max-w-4xl mx-auto space-y-12">
				{/* Hero */}
				<div className="space-y-4">
					<h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
						Cleanup Script
					</h1>
					<p className="text-xl text-gray-300 font-light max-w-2xl">
						An interactive CLI that strips optional features from the starter
						template and renames your project — so you can start with only what
						you need.
					</p>
				</div>

				{/* How to run */}
				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8 space-y-4">
					<div className="flex items-center gap-3">
						<Terminal className="w-6 h-6 text-cyan-400" />
						<h2 className="text-2xl font-bold text-white">How to run</h2>
					</div>
					<p className="text-gray-300">
						Run the cleanup script from the project root:
					</p>
					<CopyBlock text="npm run cleanup" />
					<p className="text-sm text-gray-400">
						The script presents an interactive menu where you can rename the
						project and select which features to remove. After your selections,
						it applies all changes and runs{" "}
						<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
							npm install
						</code>{" "}
						to sync dependencies.
					</p>
				</div>

				{/* What you can remove */}
				<div className="space-y-6">
					<div className="flex items-center gap-3">
						<Trash2 className="w-6 h-6 text-red-400" />
						<h2 className="text-2xl font-bold text-white">
							What you can remove
						</h2>
					</div>

					<RemovableFeatures />

					<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-4">
						<div className="flex items-center gap-3">
							<Scissors className="w-6 h-6 text-orange-400" />
							<h3 className="text-lg font-semibold text-white">
								Manual cleanup
							</h3>
						</div>
						<p className="text-sm text-gray-400">
							The cleanup script handles{" "}
							<InlineCode>src/components/release-notes/</InlineCode>{" "}
							automatically as part of the Demo Pages removal. However, the
							onboarding tutorial components are not removed by the script —
							once you've finished setting up, you can safely delete:
						</p>
						<ul className="space-y-2 text-sm text-gray-400">
							<FeatureItem
								path="src/components/tutorial/"
								description="onboarding checklist and deployment steps shown on the homepage"
							/>
						</ul>
						<p className="text-sm text-gray-500">
							You'll also want to remove the{" "}
							<InlineCode>{"<DeploymentSteps />"}</InlineCode> and{" "}
							<InlineCode>{"<TutorialStep />"}</InlineCode> usage from your
							homepage.
						</p>
					</div>
				</div>

				{/* The (clean-up) route group */}
				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8 space-y-4">
					<div className="flex items-center gap-3">
						<FolderTree className="w-6 h-6 text-yellow-400" />
						<h2 className="text-2xl font-bold text-white">
							The{" "}
							<code className="bg-slate-700 px-2 py-0.5 rounded text-gray-300 text-xl">
								(clean-up)
							</code>{" "}
							route group
						</h2>
					</div>
					<p className="text-gray-300">
						The{" "}
						<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
							src/routes/(clean-up)/
						</code>{" "}
						directory uses TanStack Router's{" "}
						<strong className="text-white">pathless route group</strong>{" "}
						convention. Parenthesised directory names group files logically
						without affecting URL paths:
					</p>
					<pre className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-gray-300">
						<code>
							{`src/routes/(clean-up)/
├── about.tsx           → serves /about
├── cleanup.tsx         → serves /cleanup
├── features.tsx        → serves /features
└── release-notes/
    ├── index.tsx       → serves /release-notes
    └── v1-0-0.tsx      → serves /release-notes/v1-0-0`}
						</code>
					</pre>
					<p className="text-sm text-gray-400">
						The name{" "}
						<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
							(clean-up)
						</code>{" "}
						signals that the entire directory is removable via the cleanup
						script as a single operation. Since this page lives inside the
						group, it gets deleted too — no extra logic needed.
					</p>
				</div>

				{/* How it works */}
				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8 space-y-4">
					<div className="flex items-center gap-3">
						<Cog className="w-6 h-6 text-green-400" />
						<h2 className="text-2xl font-bold text-white">How it works</h2>
					</div>
					<ul className="space-y-3 text-gray-300">
						<li className="flex items-start gap-2">
							<Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
							<span>
								<strong className="text-white">Pure functions</strong> — all
								transforms are exported and unit-tested independently against
								real source files
							</span>
						</li>
						<li className="flex items-start gap-2">
							<Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
							<span>
								<strong className="text-white">Idempotent</strong> — safe to run
								multiple times; guards prevent errors on already-deleted files
							</span>
						</li>
						<li className="flex items-start gap-2">
							<Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
							<span>
								<strong className="text-white">Order-independent</strong> —
								feature removals don't interfere with each other
							</span>
						</li>
						<li className="flex items-start gap-2">
							<Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
							<span>
								<strong className="text-white">
									Automatic{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										npm install
									</code>
								</strong>{" "}
								— runs after all changes to sync the lock file
							</span>
						</li>
					</ul>
				</div>

				{/* CTA */}
				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8 text-center space-y-4">
					<h2 className="text-2xl font-bold text-white">Ready to clean up?</h2>
					<p className="text-gray-400 max-w-xl mx-auto">
						Run the script, pick what to remove, and start building your app
						with a clean slate.
					</p>
					<div className="max-w-xs mx-auto">
						<CopyBlock text="npm run cleanup" />
					</div>
					<div className="flex flex-wrap justify-center gap-3 pt-2">
						<Button size="lg" variant="outline" asChild>
							<Link to="/">
								<ArrowRight className="w-5 h-5" />
								Back to Home
							</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
