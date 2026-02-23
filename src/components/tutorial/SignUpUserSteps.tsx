import { Link } from "@tanstack/react-router";
import { useSetupStatus } from "@/hooks/useSetupStatus";
import { TutorialStep } from "./TutorialStep";

export function SignUpUserSteps() {
	const { isSupabaseReachable, isUserSignedUp } = useSetupStatus();

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold text-white">
				Get started with your app
			</h2>
			<p className="text-sm text-gray-300">
				Your Supabase environment variables are set. Complete these steps to
				verify everything is working:
			</p>
			<ol className="space-y-4 list-none">
				<TutorialStep
					title="Supabase connection verified"
					description={
						isSupabaseReachable
							? "Your Supabase instance is reachable and your anon key is valid."
							: "Could not reach your Supabase instance. Check that your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct, and that Supabase is running."
					}
					autoChecked={isSupabaseReachable === true}
				/>
				<TutorialStep
					title={
						<span>
							Sign up your first user —{" "}
							<Link
								to="/login"
								className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
							>
								Go to login
							</Link>
						</span>
					}
					description="Create an account using the sign-up form. For local development, emails are captured by Mailpit at http://127.0.0.1:54324."
					autoChecked={isUserSignedUp}
				/>
				<TutorialStep
					title={
						<span>
							Visit the{" "}
							<Link
								to="/dashboard"
								className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
							>
								dashboard
							</Link>
						</span>
					}
					description="The dashboard is a protected route — only authenticated users can access it. This is powered by the _authenticated layout route guard."
				/>
			</ol>
		</div>
	);
}
