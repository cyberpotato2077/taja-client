import { getAllMapStations } from "@/mocks/data/stations";
import { http, HttpResponse } from "msw";
import type { MapStationResponse } from ".";

export const getNearbyStationsMock = http.get(
	"/api/stations/map/nearby",
	({ request }) => {
		const url = new URL(request.url);
		const latitude = url.searchParams.get("latitude");
		const longitude = url.searchParams.get("longitude");
		const size = Number(url.searchParams.get("size") ?? 100);

		console.log("msw:get :: /api/stations/map/nearby", {
			latitude,
			longitude,
			size,
		});

		const allStations = getAllMapStations();
		return HttpResponse.json<MapStationResponse[]>(
			allStations.slice(0, size),
		);
	},
);
