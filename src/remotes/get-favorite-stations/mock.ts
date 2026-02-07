import { http, HttpResponse } from "msw";
import type { MapStationResponse } from "./index";

export const mockFavoriteStations: MapStationResponse[] = [
	{
		stationId: 1001,
		number: 1001,
		latitude: 37.5,
		longitude: 126.97,
		bikeCount: 5,
		requestedAt: new Date().toISOString(),
	},
	{
		stationId: 1002,
		number: 1002,
		latitude: 37.5,
		longitude: 126.9,
		bikeCount: 3,
		requestedAt: new Date().toISOString(),
	},
	{
		stationId: 1003,
		number: 1003,
		latitude: 37.3,
		longitude: 126.9,
		bikeCount: 4,
		requestedAt: new Date().toISOString(),
	},
	{
		stationId: 1004,
		number: 1004,
		latitude: 37.5,
		longitude: 126,
		bikeCount: 7,
		requestedAt: new Date().toISOString(),
	},
];

export const getFavoriteStationsMock = http.get(
	"/api/stations/map/favorite",
	() => {
		return HttpResponse.json<MapStationResponse[]>(mockFavoriteStations);
	},
);
