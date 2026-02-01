import type { Station } from "@/remotes/get-station";
import {
	Bike,
	Clock,
	MapPin,
	MessageCircle,
	TrendingUp,
	Users,
} from "lucide-react";

export function StationDetail({ station }: { station: Station }) {
	const latestObserved =
		station.todayAvailableBike?.observedBikeCountByHour?.slice(-1)[0]
			?.bikeCount ?? 0;
	const latestPredicted =
		station.todayAvailableBike?.predictedBikeCountByHour?.slice(-1)[0]
			?.bikeCount ?? 0;
	const availabilityStatus =
		latestObserved > 10 ? "high" : latestObserved > 5 ? "medium" : "low";

	const statusColors = {
		high: "text-green-600 bg-green-50",
		medium: "text-yellow-600 bg-yellow-50",
		low: "text-red-60 bg-red-50",
	};

	return (
		<div className="p-4 pb-0 space-y-4">
			{/* Header */}
			<div className="border-b pb-3">
				<h2 className="text-lg font-bold text-gray-900 mb-1">{station.name}</h2>
				<div className="flex items-center gap-2 text-sm text-gray-600">
					<MapPin className="w-4 h-4" />
					<span>{station.address}</span>
				</div>
				<div className="mt-1 text-xs text-gray-500">
					ID: {station.stationId}
				</div>
			</div>

			{/* Current Status Card */}
			<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-2">
						<Bike className="w-5 h-5 text-blue-600" />
						<span className="font-semibold text-gray-800">
							현재 자전거 현황
						</span>
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

			{/* Operation Modes */}
			{station.operationMode && station.operationMode.length > 0 && (
				<div>
					<h3 className="text-sm font-semibold text-gray-700 mb-2">
						운영 모드
					</h3>
					<div className="flex gap-2 flex-wrap">
						{station.operationMode.map((mode, index) => (
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
								<span className="text-sm text-gray-700">
									{mode.rackCount}개 랙
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Recent Messages */}
			{station.recentPosts && station.recentPosts.length > 0 && (
				<div>
					<div className="flex items-center gap-2 mb-2">
						<MessageCircle className="w-4 h-4 text-gray-600" />
						<h3 className="text-sm font-semibold text-gray-700">최근 메시지</h3>
						<span className="text-xs text-gray-500">
							({station.recentPosts.length})
						</span>
					</div>
					<div className="space-y-2 max-h-32 overflow-y-auto">
						{station.recentPosts.slice(0, 3).map((message, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<div key={index} className="bg-gray-50 rounded-lg p-2">
								<div className="flex items-start gap-2">
									<div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
										{message.writer?.[0]?.toUpperCase() || "U"}
									</div>
									<div className="flex-1 min-w-0">
										<div className="text-xs font-medium text-gray-700">
											{message.writer}
										</div>
										<div className="text-xs text-gray-600 truncate">
											{message.message}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Nearby Stations */}
			{station.nearbyAvailableStations &&
				station.nearbyAvailableStations.length > 0 && (
					<div>
						<div className="flex items-center gap-2 mb-2">
							<Users className="w-4 h-4 text-gray-600" />
							<h3 className="text-sm font-semibold text-gray-700">
								주변 정류장
							</h3>
							<span className="text-xs text-gray-500">
								({station.nearbyAvailableStations.length}개)
							</span>
						</div>
						<div className="space-y-1">
							{station.nearbyAvailableStations
								.slice(0, 3)
								.map((nearby, index) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										className="flex items-center justify-between bg-white rounded-md p-2 border border-gray-100"
									>
										<div className="flex-1 min-w-0">
											<div className="text-sm font-medium text-gray-800 truncate">
												{nearby.name}
											</div>
											<div className="text-xs text-gray-500">
												#{nearby.stationId}
											</div>
										</div>
										<div className="text-right">
											<div className="text-sm font-medium text-blue-600">
												{nearby.distance}m
											</div>
											<div className="text-xs text-gray-500">거리</div>
										</div>
									</div>
								))}
						</div>
					</div>
				)}

			{/* Location Info */}
			<div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
				<div className="grid grid-cols-2 gap-2">
					<div>
						<span className="font-medium">위도:</span>{" "}
						{station.latitude.toFixed(6)}
					</div>
					<div>
						<span className="font-medium">경도:</span>{" "}
						{station.longitude.toFixed(6)}
					</div>
				</div>
			</div>
		</div>
	);
}
