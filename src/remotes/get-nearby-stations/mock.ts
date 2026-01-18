import { MAP_RESTRICTION } from "@/constants/maps";
import { http, HttpResponse } from "msw";
import type { Station } from ".";

const getRandomNumber = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

const createRandomStation = (index: number): Station => ({
	stationId: index,
	number: index,
	bikeCount: Math.floor(Math.random() * 20),
	latitude: getRandomNumber(MAP_RESTRICTION.south, MAP_RESTRICTION.north),
	longitude: getRandomNumber(MAP_RESTRICTION.west, MAP_RESTRICTION.east),
	requestedAt: new Date().toISOString(),
});

const createMockStations = (size: number): Station[] => {
	return Array.from({ length: size }, (_, i) => createRandomStation(i + 1));
};

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

		return HttpResponse.json<Station[]>(createMockStations(size));
	},
);
