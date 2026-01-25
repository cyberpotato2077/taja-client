import { MAP_RESTRICTION } from "@/constants/maps";
import type { Station } from "@/remotes/search-stations";
import { http, HttpResponse } from "msw";

const getRandomNumber = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

const createRandomStations = (size: number): Station[] => {
	return Array.from({ length: size }, (_, i) => ({
		stationId: i + 1,
		number: i + 1,
		name: `대여소 ${i + 1}`,
		latitude: getRandomNumber(MAP_RESTRICTION.south, MAP_RESTRICTION.north),
		longitude: getRandomNumber(MAP_RESTRICTION.west, MAP_RESTRICTION.east),
		address: `주소 ${i + 1}`,
		distance: getRandomNumber(0, 1000),
	}));
};

export const getSearchStationsMock = http.get(
	"/api/stations/map/search",
	() => {
		return HttpResponse.json<Station[]>(createRandomStations(100));
	},
);
