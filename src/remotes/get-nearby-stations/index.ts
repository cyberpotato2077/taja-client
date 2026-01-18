import { http } from "@/utils/http";

export type GetNearbyStationsRequest = {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
};

export type Station = {
	stationId: number;
	number: number;
	bikeCount: number;
	latitude: number;
	longitude: number;
	requestedAt: string;
};

type GetNearbyStationsResponse = Array<Station>;

export function getNearbyStations(params: GetNearbyStationsRequest) {
	return http.get<GetNearbyStationsResponse>("/stations/map/nearby", {
		params,
	});
}
