import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { copyToClipboard } from "./clipboard";

describe("copyToClipboard", () => {
	const writeText = vi.fn();

	beforeEach(() => {
		Object.defineProperty(globalThis, "navigator", {
			value: { clipboard: { writeText } },
			writable: true,
			configurable: true,
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("returns true when clipboard write succeeds", async () => {
		writeText.mockResolvedValue(undefined);

		const result = await copyToClipboard("hello");

		expect(result).toBe(true);
		expect(writeText).toHaveBeenCalledWith("hello");
	});

	it("returns false when clipboard write fails", async () => {
		writeText.mockRejectedValue(new Error("denied"));

		const result = await copyToClipboard("hello");

		expect(result).toBe(false);
	});

	it("passes the exact text to clipboard.writeText", async () => {
		writeText.mockResolvedValue(undefined);

		await copyToClipboard(
			"cp .env.example .env && cp .env.local.example .env.local",
		);

		expect(writeText).toHaveBeenCalledWith(
			"cp .env.example .env && cp .env.local.example .env.local",
		);
	});
});
