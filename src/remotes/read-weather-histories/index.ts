import { http } from "@/utils/http";

export function readWeatherHistories() {
	return http.post<string>("/weather/upload", {});
}
