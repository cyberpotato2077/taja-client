import { http, HttpResponse } from "msw";
import { MAP_RESTRICTION } from "@/constants/maps";

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

const createRandomStation = (id: number): Station => ({
	id: id,
	name: `Station ${id}`,
	latitude: getRandomNumber(MAP_RESTRICTION.south, MAP_RESTRICTION.north),
	longitude: getRandomNumber(MAP_RESTRICTION.west, MAP_RESTRICTION.east),
	bikeCount: Math.floor(Math.random() * 20),
	createdAt: new Date().toISOString(),
});

export const getStationMock = http.get("/api/stations/:id", ({ params }) => {
	const { id } = params;
	const stationId = Number(id);

	console.log("msw:get :: /api/stations/:id", {
		id: stationId,
	});

	return HttpResponse.json<Station>(createRandomStation(stationId));
});
