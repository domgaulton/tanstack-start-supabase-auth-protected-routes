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
				Your Supabase environment variables are set. Complete these steps:
			</p>
			<ol className="space-y-4 list-none">
				<TutorialStep
					title="Supabase connection verified"
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
				/>
			</ol>
		</div>
	);
}
