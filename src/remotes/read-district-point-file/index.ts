import { http } from "@/utils/http";

export function readDistrictPointFile(file: File) {
	const formData = new FormData();
	formData.append("file", file);

	return http.post<string>("/weather/district/upload", formData);
}
