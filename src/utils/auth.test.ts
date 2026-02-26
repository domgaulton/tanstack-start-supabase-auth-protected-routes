import { beforeEach, describe, expect, it, vi } from "vitest";
import { requireAuth } from "./auth";

const mockGetSessionReady = vi.fn();

vi.mock("@/utils/supabase", () => ({
	getSessionReady: (...args: unknown[]) => mockGetSessionReady(...args),
}));

vi.mock("@tanstack/react-router", () => ({
	redirect: (opts: { to: string }) => ({
		_redirect: true,
		to: opts.to,
	}),
}));

describe("requireAuth", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("throws a redirect to /login when there is no session", async () => {
		mockGetSessionReady.mockResolvedValue(null);

		try {
			await requireAuth();
			expect.unreachable("should have thrown");
		} catch (error) {
			expect(error).toEqual({ _redirect: true, to: "/login" });
		}
	});

	it("returns the session when user is authenticated", async () => {
		const mockSession = {
			user: { id: "user-1", email: "test@example.com" },
			access_token: "token-123",
		};

		mockGetSessionReady.mockResolvedValue(mockSession);

		const session = await requireAuth();

		expect(session).toBe(mockSession);
	});

	it("redirects to /login specifically (not / or /dashboard)", async () => {
		mockGetSessionReady.mockResolvedValue(null);

		try {
			await requireAuth();
			expect.unreachable("should have thrown");
		} catch (error) {
			const redirect = error as { to: string };
			expect(redirect.to).toBe("/login");
			expect(redirect.to).not.toBe("/");
			expect(redirect.to).not.toBe("/dashboard");
		}
	});
});
