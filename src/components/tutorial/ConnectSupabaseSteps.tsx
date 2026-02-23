import { Check, ChevronRight, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { CopyableCode, TutorialStep } from "@/components/tutorial/TutorialStep";
import { useSetupStatus } from "@/hooks/useSetupStatus";
import { hasEnvFiles } from "@/utils/env";

const COPY_CMD = "cp .env.example .env && cp .env.local.example .env.local";

export function ConnectSupabaseSteps() {
	const [copied, setCopied] = useState(false);
	const { isHostedReachable, isLocalReachable } = useSetupStatus();

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(COPY_CMD).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, []);

	return (
		<details open className="group">
			<summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-center gap-2">
				<ChevronRight className="size-5 text-gray-400 transition-transform group-open:rotate-90" />
				<h2 className="text-xl font-semibold text-white">
					Set up your environment
				</h2>
			</summary>

			<ol className="mt-4 space-y-6 list-none">
				<TutorialStep
					title="1. Create your environment files"
					autoChecked={hasEnvFiles}
					description={
						<div className="space-y-3 pt-1">
							<div className="relative">
								<pre className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-sm text-gray-300 overflow-x-auto">
									<code>{COPY_CMD}</code>
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
							<p className="text-xs text-gray-500">
								Use{" "}
								<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-400">
									.env.local
								</code>{" "}
								for local development and{" "}
								<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-400">
									.env
								</code>{" "}
								for hosted/production credentials. Both are gitignored.
							</p>
						</div>
					}
				/>

				<TutorialStep
					title={
						<span>
							2. Create a hosted Supabase project and update your{" "}
							<code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm text-gray-200">
								.env
							</code>{" "}
							file
						</span>
					}
					autoChecked={isHostedReachable}
					description={
						<div className="space-y-3 pt-1">
							<ol className="space-y-1.5 text-sm text-gray-400 list-[lower-alpha] list-inside ml-4">
								<li>
									Create a free account at{" "}
									<a
										href="https://database.new"
										target="_blank"
										rel="noopener noreferrer"
										className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
									>
										database.new
									</a>
								</li>
								<li>
									Once your project is ready, go to{" "}
									<a
										href="https://supabase.com/dashboard/project/_/settings/api"
										target="_blank"
										rel="noopener noreferrer"
										className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
									>
										Project Settings &gt; API
									</a>
								</li>
								<li>
									In your{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										.env
									</code>{" "}
									file, copy the <span className="text-gray-200">API URL</span>{" "}
									into <CopyableCode>VITE_SUPABASE_URL</CopyableCode>
								</li>
								<li>
									In your{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										.env
									</code>{" "}
									file, uncomment and paste the{" "}
									<span className="text-gray-200">anon public</span> key into{" "}
									<CopyableCode>VITE_SUPABASE_ANON_KEY</CopyableCode>
								</li>
								<li>
									In your{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										.env
									</code>{" "}
									file, uncomment and paste the{" "}
									<span className="text-gray-200">service_role secret</span> key
									into <CopyableCode>SUPABASE_SECRET_KEY</CopyableCode>
								</li>
							</ol>
						</div>
					}
				/>

				<TutorialStep
					title={
						<span>
							3. Set up local development and update your{" "}
							<code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm text-gray-200">
								.env.local
							</code>{" "}
							file
						</span>
					}
					autoChecked={isLocalReachable}
					description={
						<div className="space-y-3 pt-1">
							<ol className="space-y-1.5 text-sm text-gray-400 list-[lower-alpha] list-inside ml-4">
								<li>
									Run <CopyableCode>npm run db:start</CopyableCode> to start a
									local Supabase instance — this will run migrations that create
									a{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										profiles
									</code>{" "}
									table with Row Level Security policies and an auto-create
									trigger on sign-up
								</li>
								<li>
									Run <CopyableCode>npx supabase status</CopyableCode> to print
									your local credentials
								</li>
								<li>
									In your{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										.env.local
									</code>{" "}
									file, uncomment <CopyableCode>VITE_SUPABASE_URL</CopyableCode>
								</li>
								<li>
									In your{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										.env.local
									</code>{" "}
									file, uncomment and paste the{" "}
									<span className="text-gray-200">anon key</span> into{" "}
									<CopyableCode>VITE_SUPABASE_ANON_KEY</CopyableCode>
								</li>
								<li>
									In your{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										.env.local
									</code>{" "}
									file, uncomment and paste the{" "}
									<span className="text-gray-200">service_role key</span> into{" "}
									<CopyableCode>SUPABASE_SECRET_KEY</CopyableCode>
								</li>
							</ol>
						</div>
					}
				/>

				<TutorialStep title="4. Restart the dev server and refresh this page" />
			</ol>
		</details>
	);
}
