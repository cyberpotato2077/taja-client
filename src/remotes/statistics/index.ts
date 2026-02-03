import { http } from "@/utils/http";

export type StatisticsRequest = {
	requestedAt: string;
};

export function calculateTemperatureStatistics(request: StatisticsRequest) {
	return http.post<string>("/statistics/temperature", request);
}

export function calculateHourlyStatistics(request: StatisticsRequest) {
	return http.post<string>("/statistics/hourly", request);
}

export function calculateDayOfWeekStatistics(request: StatisticsRequest) {
	return http.post<string>("/statistics/day-of-week", request);
}
