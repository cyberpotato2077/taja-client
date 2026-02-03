import { http } from "@/utils/http";

export function healthCheck() {
	return http.get<string>("/health");
}
