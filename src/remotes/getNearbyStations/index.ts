import { http } from "@/utils/http";

type GetNearbyStationsRequest = {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
};

type Station = {
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
