import type { StationDetailResponse } from "@/remotes/get-station";
import type { useNavigate } from "@tanstack/react-router";
import { CurrentStatusCard } from "./current-status-card";
import { FavoriteButton } from "./favorite-button";
import { LocationInfo } from "./location-info";
import { NearbyStations } from "./nearby-stations";
import { OperationModes } from "./operation-modes";
import { RecentMessages } from "./recent-messages";
import { StationHeader } from "./station-header";

export function StationDetail({
	station,
	navigate,
}: {
	station: StationDetailResponse;
	navigate: ReturnType<typeof useNavigate>;
}) {

	const latestObserved =
		station.todayAvailableBike?.observedBikeCountByHour?.slice(-1)[0]
			?.bikeCount ?? 0;
	const latestPredicted =
		station.todayAvailableBike?.predictedBikeCountByHour?.slice(-1)[0]
			?.bikeCount ?? 0;

	const handleViewMorePosts = () => {
		navigate({
			to: "/station/$id/posts",
			params: {
				id: String(station.stationId),
			},
		});
	};

	return (
		<div className="p-4 pb-0 space-y-4">
			<StationHeader
				stationId={station.stationId}
				name={station.name}
				address={station.address}
				rightAddon={<FavoriteButton stationId={station.stationId} />}
			/>

			<CurrentStatusCard
				latestObserved={latestObserved}
				latestPredicted={latestPredicted}
			/>

			<OperationModes modes={station.operationMode} />

			<RecentMessages
				posts={station.recentPosts}
				onViewMore={handleViewMorePosts}
			/>

			<NearbyStations stations={station.nearbyAvailableStations} />

			<LocationInfo latitude={station.latitude} longitude={station.longitude} />
		</div>
	);
}
