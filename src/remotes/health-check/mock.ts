import { http, HttpResponse } from "msw";

export const healthCheckMock = http.get("/api/health", () => {
	return HttpResponse.json<string>("OK");
});
