import { http } from "@/utils/http";

export type MapStationResponse = {
	stationId: number;
	number: number;
	latitude: number;
	longitude: number;
	bikeCount: number;
	requestedAt: string;
};

export function findFavoriteStations() {
	return http.get<MapStationResponse[]>("/stations/map/favorite");
}
