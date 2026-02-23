import { ChevronRight } from "lucide-react";
import { TutorialStep } from "./TutorialStep";

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
					title="3. Add secrets to your GitHub repository"
					description={
						<div className="space-y-3 pt-1">
							<ol className="space-y-1.5 text-sm text-gray-400 list-decimal list-inside">
								<li>
									Go to your repo &gt;{" "}
									<span className="text-gray-200">
										Settings &gt; Secrets and variables &gt; Actions
									</span>
								</li>
								<li>
									Add{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										SUPABASE_ACCESS_TOKEN
									</code>{" "}
									with your access token
								</li>
								<li>
									Add{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										SUPABASE_PROJECT_REF
									</code>{" "}
									with your project reference ID
								</li>
							</ol>
							<p className="text-xs text-gray-500">
								These are used by the deploy workflow to push migrations to your
								hosted Supabase project.
							</p>
						</div>
					}
				/>

				<TutorialStep
					title="4. (Optional) Add Vercel secrets for app deployment"
					description={
						<div className="space-y-3 pt-1">
							<ol className="space-y-1.5 text-sm text-gray-400 list-decimal list-inside">
								<li>
									Add{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										VERCEL_TOKEN
									</code>
									,{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										VERCEL_ORG_ID
									</code>
									, and{" "}
									<code className="bg-slate-700 px-1 py-0.5 rounded text-gray-300">
										VERCEL_PROJECT_ID
									</code>{" "}
									as GitHub secrets
								</li>
							</ol>
							<p className="text-xs text-gray-500">
								The deploy workflow pushes migrations first, then builds and
								deploys to Vercel.
							</p>
						</div>
					}
				/>
			</ol>
		</details>
	);
}
