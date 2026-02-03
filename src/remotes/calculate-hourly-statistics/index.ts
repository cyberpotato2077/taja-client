import { http } from "@/utils/http";

export type StatisticsRequest = {
	requestedAt: string;
};

export function calculateHourlyStatistics(request: StatisticsRequest) {
	return http.post<string>("/statistics/hourly", request);
}
