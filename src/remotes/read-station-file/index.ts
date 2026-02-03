import { http } from "@/utils/http";

export function readStationFile(file: File) {
	const formData = new FormData();
	formData.append("file", file);

	return http.post<string>("/stations/upload", formData);
}
