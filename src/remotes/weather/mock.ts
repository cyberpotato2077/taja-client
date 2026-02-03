import { http, HttpResponse } from "msw";

export const readWeatherHistoriesMock = http.post("/api/weather/upload", () => {
	return HttpResponse.json<string>("Weather data uploaded successfully");
});

export const readDistrictPointFileMock = http.post(
	"/api/weather/district/upload",
	async ({ request }) => {
		// FormData 처리를 위한 mock
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (file) {
			return HttpResponse.json<string>(
				"District point file uploaded successfully",
			);
		}

		return HttpResponse.json({ error: "No file provided" }, { status: 400 });
	},
);
