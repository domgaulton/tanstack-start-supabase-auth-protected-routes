import { type ReactNode, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface TutorialStepProps {
	title: ReactNode;
	description?: ReactNode;
	autoChecked?: boolean;
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
