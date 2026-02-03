import { http } from "@/utils/http";

export function readStationStatus() {
	return http.post<string>("/station-status/upload", {});
}
