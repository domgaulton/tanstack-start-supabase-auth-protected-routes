import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { TutorialStep } from "@/components/tutorial/TutorialStep";
import { hasEnvFiles } from "@/utils/env";

const COPY_CMD = "cp .env.example .env && cp .env.example .env.local";

export function ConnectSupabaseSteps() {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(COPY_CMD).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, []);

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold text-white">
				Set up your environment
			</h2>

			<ol className="space-y-6 list-none">
				<TutorialStep
					title="1. Create your environment files"
					autoChecked={hasEnvFiles}
					description={
						<div className="space-y-3 pt-1">
							<div className="group relative">
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
							2. Create a Supabase project and update your{" "}
							<code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm text-gray-200">
								.env
							</code>{" "}
							file
						</span>
					}
					description={
						<div className="space-y-3 pt-1">
							<div className="rounded-lg border border-slate-700 bg-slate-900 p-4 space-y-3">
								<p className="text-sm font-medium text-cyan-400">
									<a
										href="https://database.new"
										target="_blank"
										rel="noopener noreferrer"
										className="underline underline-offset-2 hover:text-cyan-300"
									>
										Hosted Supabase
									</a>
								</p>
								<ol className="space-y-1.5 text-sm text-gray-400 list-decimal list-inside">
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
										file, copy the{" "}
										<span className="text-gray-200">API URL</span> into{" "}
										<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
											VITE_SUPABASE_URL
										</code>
									</li>
									<li>
										In your{" "}
										<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
											.env
										</code>{" "}
										file, copy the{" "}
										<span className="text-gray-200">anon public</span> key into{" "}
										<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
											VITE_SUPABASE_ANON_KEY
										</code>
									</li>
									<li>
										In your{" "}
										<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
											.env
										</code>{" "}
										file, copy the{" "}
										<span className="text-gray-200">service_role secret</span>{" "}
										key into{" "}
										<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
											SUPABASE_SECRET_KEY
										</code>
									</li>
								</ol>
							</div>
							<div className="rounded-lg border border-slate-700 bg-slate-900 p-4 space-y-3">
								<p className="text-sm font-medium text-gray-200">
									Local development
								</p>
								<ol className="space-y-1.5 text-sm text-gray-400 list-decimal list-inside">
									<li>
										Run{" "}
										<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
											npm run db:start
										</code>{" "}
										to start a local Supabase instance
									</li>
									<li>
										Run{" "}
										<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
											npx supabase status
										</code>{" "}
										to print your local API keys
									</li>
									<li>
										Paste the <span className="text-gray-200">API URL</span>,{" "}
										<span className="text-gray-200">anon key</span>, and{" "}
										<span className="text-gray-200">service_role key</span> into
										your{" "}
										<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
											.env
										</code>{" "}
										file
									</li>
								</ol>
							</div>
						</div>
					}
				/>

				<TutorialStep title="3. Restart the dev server and refresh this page" />
			</ol>
		</div>
	);
}
