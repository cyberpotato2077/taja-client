import { useAuth } from "@/hooks/use-auth";
import { useLoginDialog } from "@/hooks/use-login-dialog";
import { stationQueryOptions } from "@/queries/station-query-options";
import { addFavoriteStation } from "@/remotes/add-favorite-station";
import { deleteFavoriteStation } from "@/remotes/delete-favorite-station";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { Star } from "lucide-react";

interface FavoriteButtonProps {
	stationId: number;
}

export function FavoriteButton({ stationId }: FavoriteButtonProps) {
	const { isLoggedIn } = useAuth();

	if (isLoggedIn) {
		return <LoggedInFavoriteButton stationId={stationId} />;
	}

	return <LoggedOutFavoriteButton />;
}

function LoggedInFavoriteButton({ stationId }: { stationId: number }) {
	const queryClient = useQueryClient();

	const {
		data: { isFavorite },
	} = useSuspenseQuery(stationQueryOptions.isFavorite(stationId));

	const addFavoriteMutation = useMutation({
		mutationFn: () => addFavoriteStation(stationId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: stationQueryOptions.isFavorite(stationId).queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: stationQueryOptions.favorites().queryKey,
			});
		},
	});

	const deleteFavoriteMutation = useMutation({
		mutationFn: () => deleteFavoriteStation(stationId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: stationQueryOptions.isFavorite(stationId).queryKey,
			});
			queryClient.invalidateQueries({
				queryKey: stationQueryOptions.favorites().queryKey,
			});
		},
	});

	const toggleFavorite = () => {
		if (isFavorite) {
			deleteFavoriteMutation.mutate();
		} else {
			addFavoriteMutation.mutate();
		}
	};

	const isLoading =
		addFavoriteMutation.isPending || deleteFavoriteMutation.isPending;

	return (
		<button
			type="button"
			onClick={toggleFavorite}
			className="p-2 rounded-full hover:bg-gray-100 transition-colors"
			disabled={isLoading}
		>
			<Star
				className={`w-5 h-5 ${
					isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
				} transition-colors`}
			/>
		</button>
	);
}

function LoggedOutFavoriteButton() {
	const { openLoginDialog } = useLoginDialog();

	return (
		<button
			type="button"
			onClick={openLoginDialog}
			className="p-2 rounded-full hover:bg-gray-100 transition-colors"
		>
			<Star className="w-5 h-5 text-gray-400 transition-colors" />
		</button>
	);
}
