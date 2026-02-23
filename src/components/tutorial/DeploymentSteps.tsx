import { Check, ChevronRight, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { TutorialStep } from "./TutorialStep";

const GH_SECRET_CMD =
	"gh secret set SUPABASE_ACCESS_TOKEN --body \"$(grep '^SUPABASE_ACCESS_TOKEN=' .env | cut -d= -f2-)\" && gh secret set SUPABASE_PROJECT_REF --body \"$(grep '^SUPABASE_PROJECT_REF=' .env | cut -d= -f2-)\"";

const GH_VERCEL_CMD =
	"gh secret set VERCEL_TOKEN --body \"$(grep '^VERCEL_TOKEN=' .env | cut -d= -f2-)\"";

function CopyBlock({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, [text]);

	return (
		<div className="relative">
			<pre className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-sm text-gray-300 whitespace-pre-wrap break-all">
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

export function DeploymentSteps() {
	return (
		<details className="group">
			<summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-center gap-2">
				<ChevronRight className="size-5 text-gray-400 transition-transform group-open:rotate-90" />
				<h2 className="text-xl font-semibold text-white">Set up deployment</h2>
			</summary>
			<p className="mt-4 text-sm text-gray-300">
				Configure GitHub Actions to automatically deploy database migrations and
				your app when you push to{" "}
				<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
					main
				</code>
				.
			</p>
			<ol className="mt-4 space-y-6 list-none">
				<TutorialStep
					title="1. Get your Supabase access token"
					description={
						<div className="space-y-3 pt-1">
							<ol className="space-y-1.5 text-sm text-gray-400 list-decimal list-inside">
								<li>
									Go to{" "}
									<a
										href="https://supabase.com/dashboard/account/tokens"
										target="_blank"
										rel="noopener noreferrer"
										className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
									>
										Account Settings &gt; Access Tokens
									</a>
								</li>
								<li>Generate a new token and copy it</li>
							</ol>
						</div>
					}
				/>

				<TutorialStep
					title="2. Get your Supabase project ref"
					description={
						<div className="space-y-3 pt-1">
							<ol className="space-y-1.5 text-sm text-gray-400 list-decimal list-inside">
								<li>
									Go to{" "}
									<a
										href="https://supabase.com/dashboard/project/_/settings/general"
										target="_blank"
										rel="noopener noreferrer"
										className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
									>
										Project Settings &gt; General
									</a>
								</li>
								<li>
									Copy the <span className="text-gray-200">Reference ID</span>
								</li>
							</ol>
						</div>
					}
				/>

				<TutorialStep
					title={
						<span>
							3. Add the values to your{" "}
							<code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm text-gray-200">
								.env
							</code>{" "}
							file
						</span>
					}
					description={
						<div className="space-y-3 pt-1">
							<ol className="space-y-1.5 text-sm text-gray-400 list-decimal list-inside">
								<li>
									Uncomment and paste your access token into{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										SUPABASE_ACCESS_TOKEN
									</code>
								</li>
								<li>
									Uncomment and paste your reference ID into{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										SUPABASE_PROJECT_REF
									</code>
								</li>
							</ol>
						</div>
					}
				/>

				<TutorialStep
					title="4. Push secrets to GitHub"
					description={
						<div className="space-y-3 pt-1">
							<p className="text-sm text-gray-400">
								Using the{" "}
								<a
									href="https://cli.github.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
								>
									GitHub CLI
								</a>
								, push the secrets from your{" "}
								<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
									.env
								</code>{" "}
								file:
							</p>
							<CopyBlock text={GH_SECRET_CMD} />
							<p className="text-xs text-gray-500">
								Requires the{" "}
								<a
									href="https://cli.github.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-400 underline underline-offset-2 hover:text-gray-300"
								>
									GitHub CLI
								</a>
								. If you get a 403 error, run{" "}
								<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-500">
									gh auth refresh -s admin:org
								</code>{" "}
								to grant the secrets permission. Or add them manually in your
								repo &gt;{" "}
								<span className="text-gray-400">
									Settings &gt; Secrets and variables &gt; Actions
								</span>
							</p>
						</div>
					}
				/>

				<TutorialStep
					title="5. (Optional) Add Vercel secret for app deployment"
					description={
						<div className="space-y-3 pt-1">
							<ol className="space-y-1.5 text-sm text-gray-400 list-decimal list-inside">
								<li>
									Import your repo in the{" "}
									<a
										href="https://vercel.com/new"
										target="_blank"
										rel="noopener noreferrer"
										className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
									>
										Vercel dashboard
									</a>{" "}
									to create a new project linked to your GitHub repo
								</li>
								<li>
									Go to{" "}
									<a
										href="https://vercel.com/account/tokens"
										target="_blank"
										rel="noopener noreferrer"
										className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
									>
										Account Settings &gt; Tokens
									</a>{" "}
									and create a new token
								</li>
								<li>
									Uncomment and paste the token into{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										VERCEL_TOKEN
									</code>{" "}
									in your{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										.env
									</code>{" "}
									file, then run:
								</li>
							</ol>
							<CopyBlock text={GH_VERCEL_CMD} />
							<p className="text-xs text-gray-500">
								The deploy workflow auto-detects the Vercel project from the
								GitHub repo connection.
							</p>
						</div>
					}
				/>
			</ol>
		</details>
	);
}
