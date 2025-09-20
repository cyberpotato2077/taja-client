import { http, HttpResponse } from "msw";

type Station = {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	bikeCount: number;
	createdAt: string;
};

const getRandomNumber = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

const createRandomStation = (index: number): Station => ({
	id: index,
	name: `Station ${index}`,
	latitude: getRandomNumber(33.0, 38.8),
	longitude: getRandomNumber(125.0, 132.0),
	bikeCount: Math.floor(Math.random() * 20),
	createdAt: new Date().toISOString(),
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
		const size = Number(url.searchParams.get("size") ?? 30);

		console.log("msw:get :: /api/stations/map/nearby", {
			latitude,
			longitude,
			size,
		});

		return HttpResponse.json<Station[]>(createMockStations(size));
	},
);
