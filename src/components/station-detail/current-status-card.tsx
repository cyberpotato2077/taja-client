import { Bike, Clock, TrendingUp } from "lucide-react";

interface CurrentStatusCardProps {
	latestObserved: number;
	latestPredicted: number;
}

export function CurrentStatusCard({
	latestObserved,
	latestPredicted,
}: CurrentStatusCardProps) {
	const availabilityStatus =
		latestObserved > 10 ? "high" : latestObserved > 5 ? "medium" : "low";

	const statusColors = {
		high: "text-green-600 bg-green-50",
		medium: "text-yellow-600 bg-yellow-50",
		low: "text-red-60 bg-red-50",
	};

	return (
		<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2">
					<Bike className="w-5 h-5 text-blue-600" />
					<span className="font-semibold text-gray-800">현재 자전거 현황</span>
				</div>
				<div
					className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[availabilityStatus]}`}
				>
					{availabilityStatus === "high"
						? "충분"
						: availabilityStatus === "medium"
							? "보통"
							: "부족"}
				</div>
			</div>

			<div className="grid grid-cols-2 gap-3">
				<div className="bg-white rounded-md p-3">
					<div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
						<Clock className="w-3 h-3" />
						<span>실제 관측</span>
					</div>
					<div className="text-2xl font-bold text-gray-900">
						{latestObserved}
					</div>
					<div className="text-xs text-gray-500">대여 가능</div>
				</div>

				<div className="bg-white rounded-md p-3">
					<div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
						<TrendingUp className="w-3 h-3" />
						<span>예측 수량</span>
					</div>
					<div className="text-2xl font-bold text-blue-600">
						{latestPredicted}
					</div>
					<div className="text-xs text-gray-500">예상 대여</div>
				</div>
			</div>
		</div>
	);
}
