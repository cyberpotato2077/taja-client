import { http } from "@/utils/http";

export interface StationStatusResponse {
	stationId: number;
	availableBikeCount: number;
	availableBikeCountTimestamp: string;
}

export function getStationStatus(stationNumber: number) {
	return http.get<StationStatusResponse>(`/stations/status/${stationNumber}`);
}
