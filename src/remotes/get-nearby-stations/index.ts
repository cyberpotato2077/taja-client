import { http } from "@/utils/http";

export type GetNearbyStationsRequest = {
	latitude: number;
	longitude: number;
	latDelta: number;
	lngDelta: number;
};

export type Marker = {
	/** 대여소 리스트 */
	stationId: number;
	/** 대여소 ID */
	number: number;
	/** 남은 자전거 수 */
	bikeCount: number;
	/** 대여소 위치 위도 */
	latitude: number;
	/** 대여소 위치 경도 */
	longitude: number;
	/** 기준 시간 */
	requestedAt: string;
};

type GetNearbyStationsResponse = Array<Marker>;

export function getNearbyStations(params: GetNearbyStationsRequest) {
	return http.get<GetNearbyStationsResponse>("/stations/map/nearby", {
		params,
	});
}
