import { addStationToFavorites } from "@/mocks/favorites-state";
import { http, HttpResponse } from "msw";

export const addFavoriteStationMock = http.post(
	"/api/stations/:stationId/favorite",
	({ params }) => {
		const stationId = Number(params.stationId);

		if (addStationToFavorites(stationId)) {
			return HttpResponse.json<string>("Station added to favorites", {
				status: 200,
			});
		}

		return HttpResponse.json<string>("Station already in favorites", {
			status: 409,
		});
	},
);
