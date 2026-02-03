import { http, HttpResponse } from "msw";
import type { StatisticsRequest } from "./index";

export const calculateTemperatureStatisticsMock = http.post(
	"/api/statistics/temperature",
	async ({ request }) => {
		const body = (await request.json()) as StatisticsRequest;

		if (body.requestedAt) {
			return HttpResponse.json<string>(
				"Temperature statistics calculated successfully",
			);
		}

		return HttpResponse.json({ error: "Invalid request" }, { status: 400 });
	},
);

export const calculateHourlyStatisticsMock = http.post(
	"/api/statistics/hourly",
	async ({ request }) => {
		const body = (await request.json()) as StatisticsRequest;

		if (body.requestedAt) {
			return HttpResponse.json<string>(
				"Hourly statistics calculated successfully",
			);
		}

		return HttpResponse.json({ error: "Invalid request" }, { status: 400 });
	},
);

export const calculateDayOfWeekStatisticsMock = http.post(
	"/api/statistics/day-of-week",
	async ({ request }) => {
		const body = (await request.json()) as StatisticsRequest;

		if (body.requestedAt) {
			return HttpResponse.json<string>(
				"Day of week statistics calculated successfully",
			);
		}

		return HttpResponse.json({ error: "Invalid request" }, { status: 400 });
	},
);
