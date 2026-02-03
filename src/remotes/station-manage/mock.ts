import { http, HttpResponse } from "msw";
import type { IsFavoriteStationResponse } from "./index";

export const addFavoriteStationMock = http.post(
	"/api/stations/:stationId/favorite",
	() => {
		return HttpResponse.json<string>("Station added to favorites");
	},
);

export const deleteFavoriteStationMock = http.delete(
	"/api/stations/:stationId/favorite",
	() => {
		return HttpResponse.json<string>("Station removed from favorites");
	},
);

export const isFavoriteStationMock = http.get(
	"/api/stations/:stationId/favorite",
	({ params }) => {
		const stationId = Number(params.stationId);

		// Mock logic: station 1, 2 are favorites
		const isFavorite = stationId === 1 || stationId === 2;

		return HttpResponse.json<IsFavoriteStationResponse>({
			isFavorite,
		});
	},
);

export const readStationFileMock = http.post(
	"/api/stations/upload",
	async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (file) {
			return HttpResponse.json<string>("Station file uploaded successfully");
		}

		return HttpResponse.json({ error: "No file provided" }, { status: 400 });
	},
);

export const healthCheckMock = http.get("/api/health", () => {
	return HttpResponse.json<string>("OK");
});
