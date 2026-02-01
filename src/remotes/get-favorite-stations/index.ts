import { http } from "@/utils/http";

export type FavoriteStation = {
	/** 대여소 ID */
	stationId: number;
	/** 남은 자전거 수 */
	availableBikeCount: number;
	/** 대여소 위치 위도 */
	lat: number;
	/** 대여소 위치 경도 */
	lng: number;
};

type GetFavoriteStationsResponse = Array<FavoriteStation>;

export function getFavoriteStations() {
	return http.get<GetFavoriteStationsResponse>("/stations/map/favorites");
}
