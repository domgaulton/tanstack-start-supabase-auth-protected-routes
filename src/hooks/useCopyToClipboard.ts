import { useCallback, useState } from "react";
import { copyToClipboard } from "@/utils/clipboard";

/**
 * Hook that wraps copyToClipboard with a `copied` state
 * that resets after a timeout (default 2 seconds).
 */
export function useCopyToClipboard(text: string, resetMs = 2000) {
	const [copied, setCopied] = useState(false);

	const copy = useCallback(() => {
		copyToClipboard(text).then((ok) => {
			if (ok) {
				setCopied(true);
				setTimeout(() => setCopied(false), resetMs);
			}
		});
	}, [text, resetMs]);

	return { copied, copy };
}
