import { http } from "@/utils/http";

export type StatisticsRequest = {
	requestedAt: string;
};

export function calculateDayOfWeekStatistics(request: StatisticsRequest) {
	return http.post<string>("/statistics/day-of-week", request);
}
