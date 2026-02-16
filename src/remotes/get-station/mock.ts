import { findStationById, toStationDetailResponse } from "@/mocks/data/stations";
import { http, HttpResponse } from "msw";
import type { StationDetailResponse } from "./index";

export const getStationMock = http.get(
	"/api/stations/:stationId",
	({ params }) => {
		const { stationId } = params;
		const stationIdNum = Number(stationId);

		console.log("msw:get :: /api/stations/:stationId", {
			stationId: stationIdNum,
		});

		const baseStation = findStationById(stationIdNum);

		if (!baseStation) {
			return new HttpResponse(null, { status: 404 });
		}

		return HttpResponse.json<StationDetailResponse>(
			toStationDetailResponse(baseStation),
		);
	},
);
