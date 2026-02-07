import { http } from "@/utils/http";

export type NearbyStationRequest = {
	latitude: number;
	longitude: number;
	latDelta: number;
	lngDelta: number;
};

export type MapStationResponse = {
	stationId: number;
	number: number;
	latitude: number;
	longitude: number;
	bikeCount: number;
	requestedAt: string;
};

export function findNearbyStations(params: NearbyStationRequest) {
	return http.get<MapStationResponse[]>("/stations/map/nearby", params);
}

export function findNearbyStationsNoGeo(params: NearbyStationRequest) {
	return http.get<MapStationResponse[]>("/stations/map/nearby/no-geo", params);
}

export function findNearbyStationsIndexed(params: NearbyStationRequest) {
	return http.get<MapStationResponse[]>("/stations/map/nearby/indexed", params);
}
