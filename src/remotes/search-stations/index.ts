import { http } from "@/utils/http";

export type SearchStationsRequest = {
	/** 검색할 대여소명 */
	keyword: string;
	/** 위도 */
	lat: number;
	/** 경도 */
	lng: number;
};

export type Station = {
	/** 대여소 ID */
	stationId: number;
	/** 대여소 number */
	number: number;
	/** 대여소명 */
	name: string;
	/** 대여소 위치 위도 */
	latitude: number;
	/** 대여소 위치 경도 */
	longitude: number;
	/** 대여소 주소 */
	address: string;
	/** 현재 위치와의 거리 (10m) */
	distance: number;
};

type SearchStationsResponse = Array<Station>;

export function searchStations(params: SearchStationsRequest) {
	return http.get<SearchStationsResponse>("/stations/map/search", {
		params,
	});
}
