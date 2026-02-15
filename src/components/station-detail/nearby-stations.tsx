import type { NearbyAvailableStationDetailResponse } from "@/remotes/get-station";
import { Users } from "lucide-react";

interface NearbyStationsProps {
	stations: NearbyAvailableStationDetailResponse[];
}

export function NearbyStations({ stations }: NearbyStationsProps) {
	if (!stations || stations.length === 0) {
		return null;
	}

	return (
		<div>
			<div className="flex items-center gap-2 mb-2">
				<Users className="w-4 h-4 text-gray-600" />
				<h3 className="text-sm font-semibold text-gray-700">주변 정류장</h3>
				<span className="text-xs text-gray-500">({stations.length}개)</span>
			</div>
			<div className="space-y-1">
				{stations
					.slice(0, 3)
					.map(
						(nearby: NearbyAvailableStationDetailResponse, index: number) => (
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
						),
					)}
			</div>
		</div>
	);
}
