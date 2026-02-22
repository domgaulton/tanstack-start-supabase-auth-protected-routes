import { createFileRoute, Link } from "@tanstack/react-router";
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

export const Route = createFileRoute("/forgot-password")({
	component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
	const emailId = useId();
	const [email, setEmail] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/reset-password`,
		});

		setIsSubmitting(false);

		if (error) {
			setError(error.message);
			return;
		}

		setSuccess(true);
	}

	return (
		<div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Reset password</CardTitle>
					<CardDescription>
						Enter your email and we'll send you a link to reset your password.
					</CardDescription>
				</CardHeader>
				{success ? (
					<CardContent>
						<Alert>
							<AlertDescription>
								Check your email for a password reset link.
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
				) : (
					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-4">
							{error && (
								<Alert variant="destructive">
									<AlertDescription>{error}</AlertDescription>
								</Alert>
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
						</CardContent>
						<CardFooter className="flex flex-col gap-4">
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? "Sending..." : "Send reset link"}
							</Button>
							<Link
								to="/login"
								className="text-sm text-muted-foreground hover:underline"
							>
								Back to login
							</Link>
						</CardFooter>
					</form>
				)}
			</Card>
		</div>
	);
}
