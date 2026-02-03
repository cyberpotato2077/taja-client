import { http, HttpResponse } from "msw";

export const readStationStatusMock = http.post(
	"/api/station-status/upload",
	() => {
		return HttpResponse.json<string>("Station status uploaded successfully");
	},
);
