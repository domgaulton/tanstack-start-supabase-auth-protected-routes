import { Check, Copy } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface TutorialStepProps {
	title: ReactNode;
	description?: ReactNode;
	autoChecked?: boolean;
}

export function CopyableCode({ children }: { children: string }) {
	const { copied, copy } = useCopyToClipboard(children);

	return (
		<button
			type="button"
			onClick={copy}
			className="inline-flex items-center gap-1 bg-slate-700 px-1.5 py-0.5 rounded text-gray-300 hover:bg-slate-600 transition-colors cursor-pointer"
			aria-label={`Copy ${children} to clipboard`}
		>
			<code>{children}</code>
			{copied ? (
				<Check className="size-3 text-green-400" />
			) : (
				<Copy className="size-3 text-gray-500" />
			)}
		</button>
	);
}

export function TutorialStep({
	title,
	description,
	autoChecked,
}: TutorialStepProps) {
	const [manualChecked, setManualChecked] = useState(false);
	const isAuto = autoChecked !== undefined;
	const checked = isAuto ? autoChecked : manualChecked;

	return (
		<li className="flex items-start gap-3">
			<Checkbox
				checked={checked}
				disabled={isAuto}
				onCheckedChange={(value) => {
					if (!isAuto) setManualChecked(Boolean(value));
				}}
				className="mt-0.5"
			/>
			<div className="flex-1 space-y-1">
				<span
					className={checked ? "line-through text-gray-500" : "text-gray-200"}
				>
					{title}
				</span>
				{description && <p className="text-sm text-gray-400">{description}</p>}
			</div>
		</li>
	);
}
