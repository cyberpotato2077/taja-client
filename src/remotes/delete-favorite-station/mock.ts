import { removeStationFromFavorites } from "@/mocks/favorites-state";
import { http, HttpResponse } from "msw";

export const deleteFavoriteStationMock = http.delete(
	"/api/stations/:stationId/favorite",
	({ params }) => {
		const stationId = Number(params.stationId);

		if (removeStationFromFavorites(stationId)) {
			return HttpResponse.json<string>("Station removed from favorites", {
				status: 200,
			});
		}

		return HttpResponse.json<string>("Station not in favorites", {
			status: 404,
		});
	},
);
