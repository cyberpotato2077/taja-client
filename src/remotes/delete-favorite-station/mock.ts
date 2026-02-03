import { http, HttpResponse } from "msw";

export const deleteFavoriteStationMock = http.delete(
	"/api/stations/:stationId/favorite",
	() => {
		return HttpResponse.json<string>("Station removed from favorites");
	},
);
