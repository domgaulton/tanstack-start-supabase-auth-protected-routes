import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";
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

export const Route = createFileRoute("/reset-password")({
	component: ResetPasswordPage,
});

function ResetPasswordPage() {
	const navigate = useNavigate();
	const passwordId = useId();
	const confirmPasswordId = useId();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [hasSession, setHasSession] = useState(false);

	useEffect(() => {
		supabase.auth.onAuthStateChange((event) => {
			if (event === "PASSWORD_RECOVERY") {
				setHasSession(true);
			}
		});
	}, []);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters.");
			return;
		}

		setIsSubmitting(true);

		const { error } = await supabase.auth.updateUser({ password });

		setIsSubmitting(false);

		if (error) {
			setError(error.message);
			return;
		}

		setSuccess(true);
		setTimeout(() => navigate({ to: "/dashboard" }), 2000);
	}

	if (!hasSession) {
		return (
			<div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl">Reset password</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							Verifying your reset link...
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Set new password</CardTitle>
					<CardDescription>Enter your new password below.</CardDescription>
				</CardHeader>
				{success ? (
					<CardContent>
						<Alert>
							<AlertDescription>
								Password updated successfully. Redirecting to dashboard...
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
								<Label htmlFor={passwordId}>New password</Label>
								<Input
									id={passwordId}
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor={confirmPasswordId}>Confirm new password</Label>
								<Input
									id={confirmPasswordId}
									type="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? "Updating..." : "Update password"}
							</Button>
						</CardFooter>
					</form>
				)}
			</Card>
		</div>
	);
}
