import { http, HttpResponse } from "msw";
import type { StatisticsRequest } from "./index";

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
