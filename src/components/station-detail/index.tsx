import type { StationDetailResponse } from "@/remotes/get-station";
import { useNavigate } from "@tanstack/react-router";
import { RefreshCw, Share2 } from "lucide-react";
import { Suspense } from "react";
import { BikeCountChart } from "./bike-count-chart";
import { FavoriteButton } from "./favorite-button";
import { LocationInfo } from "./location-info";
import { NearbyStations } from "./nearby-stations";
import { RecentMessages } from "./recent-messages";

export function StationDetail({
	station,
}: {
	station: StationDetailResponse;
}) {
	const navigate = useNavigate();

	const latestObserved =
		station.todayAvailableBike?.observedBikeCountByHour?.slice(-1)[0]
			?.bikeCount ?? 0;

	const handleViewMorePosts = () => {
		navigate({
			to: "/station/$id/posts",
			params: {
				id: String(station.stationId),
			},
		});
	};

	const handleViewStatistics = () => {
		navigate({
			to: "/station/$id/statistics",
			params: {
				id: String(station.stationId),
			},
		});
	};

	const formatTimestamp = (timestamp: string) => {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${year}.${month}.${day} ${hours}:${minutes} 기준`;
	};

	return (
		<div className="p-4 pb-0 space-y-4">
			{/* 상단 헤더 섹션 */}
			<div>
				{/* 메인 콘텐츠 영역 */}
				<div className="flex items-start justify-between">
					{/* 좌측: 스테이션 정보 */}
					<div className="flex-1">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">
							{station.name}
						</h1>
						<p className="text-sm text-gray-600 mb-1">{station.address}</p>
						{station.operationMode && station.operationMode.length > 0 && (
							<p className="text-sm text-gray-700 font-medium">
								{station.operationMode[0].mode}{" "}
								{station.operationMode[0].rackCount}
							</p>
						)}
					</div>

					{/* 우측: 현재 자전거 대수 */}
					<div className="flex flex-col items-end">
						<div className="text-6xl font-bold text-gray-900 leading-none mb-1">
							{latestObserved}
						</div>
						<div className="flex items-center gap-1 text-xs text-gray-500">
							<span>
								{station.todayAvailableBike?.timeStamp
									? formatTimestamp(station.todayAvailableBike.timeStamp)
									: ""}
							</span>
							<RefreshCw className="w-3 h-3" />
						</div>
					</div>
				</div>

				{/* 공유 버튼 및 즐겨찾기 버튼 */}
				<div className="mt-4 flex items-center justify-between">
					<button
						type="button"
						className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium text-gray-700 flex items-center gap-2 transition-colors"
					>
						<Share2 className="w-4 h-4" />
						공유
					</button>
					<Suspense fallback={<div className="w-9 h-9" />}>
						<FavoriteButton stationId={station.stationId} />
					</Suspense>
				</div>
			</div>

			{/* 오늘의 남은 자전거 그래프 */}
			{station.todayAvailableBike && (
				<BikeCountChart
					data={station.todayAvailableBike}
					onViewMore={handleViewStatistics}
				/>
			)}

			<RecentMessages
				stationId={station.stationId}
				posts={station.recentPosts}
				onViewMore={handleViewMorePosts}
			/>

			<NearbyStations stations={station.nearbyAvailableStations} />

			<LocationInfo latitude={station.latitude} longitude={station.longitude} />
		</div>
	);
}
