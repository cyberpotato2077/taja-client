import { http } from "@/utils/http";

export function joinBoard(stationId: number) {
	return http.post<string>(`/stations/${stationId}/posts/join`, {});
}
