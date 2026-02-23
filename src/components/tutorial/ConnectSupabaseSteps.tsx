import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";

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

			<div className="space-y-3">
				<p className="text-sm text-gray-300">
					1. Copy the example file to get started:
				</p>
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

			<div className="space-y-3">
				<p className="text-sm text-gray-300">
					2. Create a Supabase project and fill in your{" "}
					<code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm text-gray-200">
						VITE_SUPABASE_ANON_KEY
					</code>{" "}
					and{" "}
					<code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm text-gray-200">
						SUPABASE_SECRET_KEY
					</code>
					. For local dev, run{" "}
					<code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm text-gray-200">
						npx supabase status
					</code>{" "}
					to get these values. For hosted Supabase, find them in your{" "}
					<a
						href="https://supabase.com/dashboard/project/_/settings/api"
						target="_blank"
						rel="noopener noreferrer"
						className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
					>
						project settings
					</a>
					.
				</p>
			</div>

			<div className="space-y-3">
				<p className="text-sm text-gray-300">
					3. Restart the dev server and refresh this page.
				</p>
			</div>

			<p className="text-xs text-gray-500 pt-2">
				Don't have a Supabase project yet? Create one at{" "}
				<a
					href="https://database.new"
					target="_blank"
					rel="noopener noreferrer"
					className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
				>
					database.new
				</a>
			</p>
		</div>
	);
}
