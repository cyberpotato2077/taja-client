import { getAllMapStations } from "@/mocks/data/stations";
import { http, HttpResponse } from "msw";
import type { NearbyStationsResponse } from ".";

export const getNearbyStationsMock = http.get(
	"/api/stations/map/nearby",
	({ request }) => {
		const url = new URL(request.url);
		const latitude = Number(url.searchParams.get("latitude") ?? 0);
		const longitude = Number(url.searchParams.get("longitude") ?? 0);
		const latDelta = Number(url.searchParams.get("latDelta") ?? 0);
		const lngDelta = Number(url.searchParams.get("lngDelta") ?? 0);

		console.log("msw:get :: /api/stations/map/nearby", {
			latitude,
			longitude,
			latDelta,
			lngDelta,
		});

		// 넓은 영역 (델타값 0.3 이상): 클러스터 응답
		if (latDelta >= 0.3 || lngDelta >= 0.3) {
			return HttpResponse.json<NearbyStationsResponse>({
				viewType: "clusters",
				stations: null,
				clusters: [
					{
						latitude: latitude + 0.05,
						longitude: longitude + 0.05,
						stationCount: 43,
					},
					{
						latitude: latitude - 0.05,
						longitude: longitude + 0.05,
						stationCount: 69,
					},
					{
						latitude: latitude + 0.05,
						longitude: longitude - 0.05,
						stationCount: 127,
					},
					{
						latitude: latitude - 0.05,
						longitude: longitude - 0.05,
						stationCount: 85,
					},
				],
			});
		}

		// 좁은 영역: 개별 대여소 응답
		const allStations = getAllMapStations();
		return HttpResponse.json<NearbyStationsResponse>({
			viewType: "stations",
			stations: allStations.slice(0, 20),
			clusters: null,
		});
	},
);
