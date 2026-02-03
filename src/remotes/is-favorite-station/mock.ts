import { http, HttpResponse } from "msw";
import type { IsFavoriteStationResponse } from "./index";

export const isFavoriteStationMock = http.get(
	"/api/stations/:stationId/favorite",
	({ params }) => {
		const stationId = Number(params.stationId);

		// Mock logic: station 1, 2 are favorites
		const isFavorite = stationId === 1 || stationId === 2;

		return HttpResponse.json<IsFavoriteStationResponse>({
			isFavorite,
		});
	},
);
