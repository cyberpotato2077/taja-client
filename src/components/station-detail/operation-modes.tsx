import type { OperationMode } from "@/remotes/get-station";

interface OperationModesProps {
	modes: OperationMode[];
}

export function OperationModes({ modes }: OperationModesProps) {
	if (!modes || modes.length === 0) {
		return null;
	}

	return (
		<div>
			<h3 className="text-sm font-semibold text-gray-700 mb-2">운영 모드</h3>
			<div className="flex gap-2 flex-wrap">
				{modes.map((mode: OperationMode, index: number) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className="bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-2"
					>
						<span
							className={`font-medium text-sm ${mode.mode === "LCD" ? "text-blue-600" : "text-green-600"}`}
						>
							{mode.mode}
						</span>
						<span className="text-xs text-gray-600">•</span>
						<span className="text-sm text-gray-700">{mode.rackCount}개 랙</span>
					</div>
				))}
			</div>
		</div>
	);
}
