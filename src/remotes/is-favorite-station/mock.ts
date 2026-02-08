import { isStationFavorite } from "@/mocks/favorites-state";
import { http, HttpResponse } from "msw";
import type { IsFavoriteStationResponse } from "./index";

export const isFavoriteStationMock = http.get(
	"/api/stations/:stationId/favorite",
	({ params }) => {
		const stationId = Number(params.stationId);
		const isFavorite = isStationFavorite(stationId);

		return HttpResponse.json<IsFavoriteStationResponse>({
			isFavorite,
		});
	},
);
