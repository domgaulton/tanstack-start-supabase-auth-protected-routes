import {
	createFileRoute,
	Link,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import { useId, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/utils/supabase";

export const Route = createFileRoute("/login")({
	async beforeLoad() {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (session) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();
	const emailId = useId();
	const passwordId = useId();
	const confirmPasswordId = useId();
	const displayNameId = useId();
	const [mode, setMode] = useState<"login" | "signup">("login");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [signupSuccess, setSignupSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		if (mode === "signup") {
			if (password !== confirmPassword) {
				setError("Passwords do not match.");
				setIsSubmitting(false);
				return;
			}

			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: { data: { display_name: displayName } },
			});

			setIsSubmitting(false);

			if (error) {
				setError(error.message);
				return;
			}

			setSignupSuccess(true);
			return;
		}

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		setIsSubmitting(false);

		if (error) {
			setError(error.message);
			return;
		}

		navigate({ to: "/dashboard" });
	}

	function toggleMode() {
		setMode((m) => (m === "login" ? "signup" : "login"));
		setError(null);
		setSignupSuccess(false);
	}

	if (signupSuccess) {
		return (
			<div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl">Check your email</CardTitle>
						<CardDescription>
							We've sent a confirmation link to <strong>{email}</strong>.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Alert>
							<AlertDescription>
								Click the link in your email to activate your account.
								{import.meta.env.DEV && (
									<>
										{" "}
										Local dev: check Mailpit at{" "}
										<a
											href="http://127.0.0.1:54324"
											target="_blank"
											rel="noreferrer"
											className="underline font-medium"
										>
											http://127.0.0.1:54324
										</a>
									</>
								)}
							</AlertDescription>
						</Alert>
					</CardContent>
					<CardFooter>
						<button
							type="button"
							onClick={toggleMode}
							className="text-sm text-muted-foreground hover:underline"
						>
							Back to login
						</button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">
						{mode === "login" ? "Log in" : "Create account"}
					</CardTitle>
					<CardDescription>
						{mode === "login"
							? "Enter your email and password to access your account."
							: "Create an account to get started."}
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						{error && (
							<Alert variant="destructive">
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						{mode === "signup" && (
							<div className="space-y-2">
								<Label htmlFor={displayNameId}>Display name</Label>
								<Input
									id={displayNameId}
									type="text"
									placeholder="Your name"
									value={displayName}
									onChange={(e) => setDisplayName(e.target.value)}
									required
								/>
							</div>
						)}
						<div className="space-y-2">
							<Label htmlFor={emailId}>Email</Label>
							<Input
								id={emailId}
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor={passwordId}>Password</Label>
							<Input
								id={passwordId}
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						{mode === "signup" && (
							<div className="space-y-2">
								<Label htmlFor={confirmPasswordId}>Confirm password</Label>
								<Input
									id={confirmPasswordId}
									type="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
							</div>
						)}
					</CardContent>
					<CardFooter className="flex flex-col gap-4">
						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting
								? mode === "login"
									? "Logging in..."
									: "Creating account..."
								: mode === "login"
									? "Log in"
									: "Create account"}
						</Button>
						<div className="flex flex-col items-center gap-2">
							<button
								type="button"
								onClick={toggleMode}
								className="text-sm text-muted-foreground hover:underline"
							>
								{mode === "login"
									? "Don't have an account? Sign up"
									: "Already have an account? Log in"}
							</button>
							{mode === "login" && (
								<Link
									to="/forgot-password"
									className="text-sm text-muted-foreground hover:underline"
								>
									Forgot your password?
								</Link>
							)}
						</div>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
