import { mockFavoriteStationsState } from "@/mocks/favorites-state";
import { http, HttpResponse } from "msw";
import type { MapStationResponse } from "./index";

export const getFavoriteStationsMock = http.get(
	"/api/stations/map/favorite",
	() => {
		return HttpResponse.json<MapStationResponse[]>([
			...mockFavoriteStationsState,
		]);
	},
);
