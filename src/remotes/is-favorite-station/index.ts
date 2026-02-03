import { http } from "@/utils/http";

export interface IsFavoriteStationResponse {
	isFavorite: boolean;
}

export function isFavoriteStation(stationId: number) {
	return http.get<IsFavoriteStationResponse>(`/stations/${stationId}/favorite`);
}
