import { http } from "@/utils/http";

export function readWeatherHistories() {
	return http.post<string>("/weather/upload", {});
}

export type ReadDistrictPointFileRequest = {
	file: File;
};

export function readDistrictPointFile(file: File) {
	const formData = new FormData();
	formData.append("file", file);

	return http.post<string>("/weather/district/upload", formData);
}
