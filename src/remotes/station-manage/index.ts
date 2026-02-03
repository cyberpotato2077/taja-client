import { http } from "@/utils/http";

export interface IsFavoriteStationResponse {
	isFavorite: boolean;
}

export function addFavoriteStation(stationId: number) {
	return http.post<string>(`/stations/${stationId}/favorite`, {});
}

export function deleteFavoriteStation(stationId: number) {
	return http.delete<string>(`/stations/${stationId}/favorite`);
}

export function isFavoriteStation(stationId: number) {
	return http.get<IsFavoriteStationResponse>(`/stations/${stationId}/favorite`);
}

export function readStationFile(file: File) {
	const formData = new FormData();
	formData.append("file", file);

	return http.post<string>("/stations/upload", formData);
}

export function healthCheck() {
	return http.get<string>("/health");
}
