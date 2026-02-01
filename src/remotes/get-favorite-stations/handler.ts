import { http, HttpResponse } from "msw";
import { mockFavoriteStations } from "./mock";

export const getFavoriteStationsMock = http.get(
	"/stations/map/favorites",
	() => {
		return HttpResponse.json(mockFavoriteStations);
	},
);
