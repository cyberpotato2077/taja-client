import { http, HttpResponse } from "msw";

export const joinBoardMock = http.post(
	"/api/stations/:stationId/posts/join",
	() => {
		return HttpResponse.json<string>("Successfully joined the board");
	},
);
