import { http } from "@/utils/http";

export type StatisticsRequest = {
	requestedAt: string;
};

export function calculateTemperatureStatistics(request: StatisticsRequest) {
	return http.post<string>("/statistics/temperature", request);
}
