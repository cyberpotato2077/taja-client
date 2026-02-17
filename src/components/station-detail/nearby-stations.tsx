import type { NearbyAvailableStationDetailResponse } from "@/remotes/get-station";
import { useRouter } from "@tanstack/react-router";
import { useMap } from "@vis.gl/react-google-maps";
import { Users } from "lucide-react";

interface NearbyStationsProps {
	stations: NearbyAvailableStationDetailResponse[];
}

export function NearbyStations({ stations }: NearbyStationsProps) {
	const map = useMap();
	const router = useRouter();

	if (!stations || stations.length === 0) {
		return null;
	}

	const handleStationClick = (nearby: NearbyAvailableStationDetailResponse) => {
		// 지도가 있으면 지도 이동 + URL 업데이트 (replace)
		if (map) {
			map.panTo({
				lat: nearby.latitude,
				lng: nearby.longitude,
			});

			router.navigate({
				to: "/",
				search: {
					activeStationId: nearby.stationId,
					latitude: nearby.latitude,
					longitude: nearby.longitude,
				},
				replace: true,
			});
		} else {
			// 지도가 없으면 상세 페이지로 이동
			router.navigate({
				to: "/station/$id",
				params: { id: String(nearby.stationId) },
			});
		}
	};

	return (
		<div>
			<div className="flex items-center gap-2 mb-2">
				<Users className="w-4 h-4 text-gray-600" />
				<h3 className="text-sm font-semibold text-gray-700">주변 대여소</h3>
				<span className="text-xs text-gray-500">({stations.length}개)</span>
			</div>
			<div className="space-y-1">
				{stations
					.slice(0, 3)
					.map(
						(nearby: NearbyAvailableStationDetailResponse, index: number) => (
							<button
								type="button"
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								onClick={() => handleStationClick(nearby)}
								className="w-full flex items-center justify-between bg-white rounded-md p-2 border border-gray-100 transition-colors hover:bg-gray-50 hover:border-blue-300 cursor-pointer"
							>
								<div className="flex-1 min-w-0 text-left">
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
							</button>
						),
					)}
			</div>
		</div>
	);
}
