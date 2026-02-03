import { http, HttpResponse } from "msw";

export const readWeatherHistoriesMock = http.post("/api/weather/upload", () => {
	return HttpResponse.json<string>("Weather data uploaded successfully");
});
