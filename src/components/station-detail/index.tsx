import { addFavoriteStation } from "@/remotes/add-favorite-station";
import { deleteFavoriteStation } from "@/remotes/delete-favorite-station";
import type { StationDetailResponse } from "@/remotes/get-station";
import { isFavoriteStation } from "@/remotes/is-favorite-station";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { useNavigate } from "@tanstack/react-router";
import { CurrentStatusCard } from "./current-status-card";
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
	const queryClient = useQueryClient();

	const { data: favoriteData } = useQuery({
		queryKey: ["favorite", station.stationId],
		queryFn: () => isFavoriteStation(station.stationId),
	});

	const addFavoriteMutation = useMutation({
		mutationFn: () => addFavoriteStation(station.stationId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["favorite", station.stationId],
			});
			queryClient.invalidateQueries({
				queryKey: ["station", "favorites"],
			});
		},
	});

	const deleteFavoriteMutation = useMutation({
		mutationFn: () => deleteFavoriteStation(station.stationId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["favorite", station.stationId],
			});
			queryClient.invalidateQueries({
				queryKey: ["station", "favorites"],
			});
		},
	});

	const isFavorite = favoriteData?.isFavorite ?? false;

	const handleToggleFavorite = () => {
		if (isFavorite) {
			deleteFavoriteMutation.mutate();
		} else {
			addFavoriteMutation.mutate();
		}
	};

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
				isFavorite={isFavorite}
				onToggleFavorite={handleToggleFavorite}
				isLoading={
					addFavoriteMutation.isPending || deleteFavoriteMutation.isPending
				}
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
