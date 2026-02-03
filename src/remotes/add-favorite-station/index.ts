import { http } from "@/utils/http";

export function addFavoriteStation(stationId: number) {
	return http.post<string>(`/stations/${stationId}/favorite`, {});
}
