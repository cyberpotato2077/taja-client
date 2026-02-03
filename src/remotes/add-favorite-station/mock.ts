import { http, HttpResponse } from "msw";

export const addFavoriteStationMock = http.post(
	"/api/stations/:stationId/favorite",
	() => {
		return HttpResponse.json<string>("Station added to favorites");
	},
);
