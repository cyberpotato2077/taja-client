import { addFavoriteStation } from "@/remotes/add-favorite-station";
import { deleteFavoriteStation } from "@/remotes/delete-favorite-station";
import { isFavoriteStation } from "@/remotes/is-favorite-station";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFavoriteStation(stationId: number) {
	const queryClient = useQueryClient();

	const { data: favoriteData } = useQuery({
		queryKey: ["favorite", stationId],
		queryFn: () => isFavoriteStation(stationId),
	});

	const addFavoriteMutation = useMutation({
		mutationFn: () => addFavoriteStation(stationId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["favorite", stationId],
			});
			queryClient.invalidateQueries({
				queryKey: ["station", "favorites"],
			});
		},
	});

	const deleteFavoriteMutation = useMutation({
		mutationFn: () => deleteFavoriteStation(stationId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["favorite", stationId],
			});
			queryClient.invalidateQueries({
				queryKey: ["station", "favorites"],
			});
		},
	});

	const isFavorite = favoriteData?.isFavorite ?? false;

	const toggleFavorite = () => {
		if (isFavorite) {
			deleteFavoriteMutation.mutate();
		} else {
			addFavoriteMutation.mutate();
		}
	};

	const isLoading =
		addFavoriteMutation.isPending || deleteFavoriteMutation.isPending;

	return {
		isFavorite,
		toggleFavorite,
		isLoading,
	};
}
