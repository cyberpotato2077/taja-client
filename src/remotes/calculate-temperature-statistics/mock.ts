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
