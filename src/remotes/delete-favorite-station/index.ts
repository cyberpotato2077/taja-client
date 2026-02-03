import { http } from "@/utils/http";

export function deleteFavoriteStation(stationId: number) {
	return http.delete<string>(`/stations/${stationId}/favorite`);
}
