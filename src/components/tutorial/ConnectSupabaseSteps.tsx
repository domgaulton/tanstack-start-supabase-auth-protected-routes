import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ConnectSupabaseSteps() {
	return (
		<div className="space-y-6">
			<Alert variant="destructive">
				<AlertTriangle className="size-4" />
				<AlertTitle>Environment variables not found</AlertTitle>
				<AlertDescription>
					Copy the example env file and fill in your Supabase credentials to get
					started.
				</AlertDescription>
			</Alert>

			<div className="space-y-4">
				<h2 className="text-xl font-semibold text-white">
					Set up your environment
				</h2>

				<div className="space-y-3">
					<p className="text-sm text-gray-300">1. Copy the example file:</p>
					<pre className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-gray-300 overflow-x-auto">
						<code>cp .env.example .env.local</code>
					</pre>
				</div>

				<div className="space-y-3">
					<p className="text-sm text-gray-300">
						2. Open{" "}
						<code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm text-gray-200">
							.env.local
						</code>{" "}
						and fill in your Supabase URL and anon key. You can find these in
						your{" "}
						<a
							href="https://supabase.com/dashboard/project/_/settings/api"
							target="_blank"
							rel="noopener noreferrer"
							className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
						>
							Supabase project settings
						</a>
						, or run{" "}
						<code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm text-gray-200">
							npx supabase status
						</code>{" "}
						for local development.
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
		</div>
	);
}
