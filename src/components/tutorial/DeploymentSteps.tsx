import { Check, ChevronRight, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { CopyableCode, TutorialStep } from "./TutorialStep";

const GH_SECRETS_CMD =
	"gh secret set SUPABASE_ACCESS_TOKEN --body \"$(grep '^SUPABASE_ACCESS_TOKEN=' .env | cut -d= -f2-)\" && gh secret set SUPABASE_PROJECT_REF --body \"$(grep '^SUPABASE_PROJECT_REF=' .env | cut -d= -f2-)\" && gh secret set VERCEL_TOKEN --body \"$(grep '^VERCEL_TOKEN=' .env | cut -d= -f2-)\"";

function CopyBlock({ text }: { text: string }) {
	const { copied, copy: handleCopy } = useCopyToClipboard(text);

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
				<h2 className="text-xl font-semibold text-white">
					Set up for CI/CD deployments
				</h2>
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
							<ol className="space-y-1.5 text-sm text-gray-400 list-[lower-alpha] list-inside ml-4">
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
								<li>
									Uncomment and paste your access token into{" "}
									<CopyableCode>SUPABASE_ACCESS_TOKEN</CopyableCode> in your{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										.env
									</code>{" "}
									file
								</li>
							</ol>
						</div>
					}
				/>

				<TutorialStep
					title="2. Get your Supabase project ref"
					description={
						<div className="space-y-3 pt-1">
							<ol className="space-y-1.5 text-sm text-gray-400 list-[lower-alpha] list-inside ml-4">
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
								<li>
									Uncomment and paste your reference ID into{" "}
									<CopyableCode>SUPABASE_PROJECT_REF</CopyableCode> in your{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										.env
									</code>{" "}
									file
								</li>
							</ol>
						</div>
					}
				/>

				<TutorialStep
					title="3. (Optional) Get your Vercel token"
					description={
						<div className="space-y-3 pt-1">
							<ol className="space-y-1.5 text-sm text-gray-400 list-[lower-alpha] list-inside ml-4">
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
									<CopyableCode>VERCEL_TOKEN</CopyableCode> in your{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										.env
									</code>{" "}
									file
								</li>
							</ol>
							<p className="text-xs text-gray-500">
								The deploy workflow auto-detects the Vercel project from the
								GitHub repo connection.
							</p>
						</div>
					}
				/>

				<TutorialStep
					title="4. Push all secrets to GitHub"
					description={
						<div className="space-y-3 pt-1">
							<div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-sm text-gray-300">
								<p>
									Requires the{" "}
									<a
										href="https://cli.github.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
									>
										GitHub CLI
									</a>
									. If you get a 403 error, run the following to grant the
									secrets permission:
								</p>
								<p className="mt-1">
									<CopyableCode>gh auth refresh -s admin:org</CopyableCode>
								</p>
								<p className="mt-2 text-gray-400">
									Or add them manually in your repo &gt;{" "}
									<span className="text-gray-200">
										Settings &gt; Secrets and variables &gt; Actions
									</span>
								</p>
							</div>
							<ol className="space-y-1.5 text-sm text-gray-400 list-[lower-alpha] list-inside ml-4">
								<li>
									Run the following command in your terminal to push all secrets
									from your{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										.env
									</code>{" "}
									file
								</li>
							</ol>
							<CopyBlock text={GH_SECRETS_CMD} />
						</div>
					}
				/>
			</ol>
		</details>
	);
}
