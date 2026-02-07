import { http } from "@/utils/http";

export type SearchStationRequest = {
	keyword: string;
	lat: number;
	lng: number;
};

export type StationSimpleResponse = {
	stationId: number;
	number: number;
	name: string;
	latitude: number;
	longitude: number;
	address: string;
	distance: number;
};

export function searchStation(params: SearchStationRequest) {
	return http.get<StationSimpleResponse[]>("/stations/map/search", params);
}
