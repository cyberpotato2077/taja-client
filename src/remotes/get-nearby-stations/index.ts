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

export type MapClusterResponse = {
	latitude: number;
	longitude: number;
	stationCount: number;
};

export type NearbyStationsResponse =
	| {
			viewType: "stations";
			stations: MapStationResponse[];
			clusters: null;
	  }
	| {
			viewType: "clusters";
			stations: null;
			clusters: MapClusterResponse[];
	  };

export function findNearbyStations(params: NearbyStationRequest) {
	return http.get<NearbyStationsResponse>("/stations/map/nearby", params);
}

export function findNearbyStationsNoGeo(params: NearbyStationRequest) {
	return http.get<NearbyStationsResponse>("/stations/map/nearby/no-geo", params);
}

export function findNearbyStationsIndexed(params: NearbyStationRequest) {
	return http.get<NearbyStationsResponse>("/stations/map/nearby/indexed", params);
}
