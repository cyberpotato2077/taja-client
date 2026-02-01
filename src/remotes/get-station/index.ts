import { http } from "@/utils/http";

export type GetStationRequest = {
	/** 대여소 ID */
	id: number;
};

export interface OperationMode {
	/** 운영 모드 타입 */
	mode: "LCD" | "QR";
	/** 랙 수 */
	rackCount: number;
}

export interface BikeCountByHour {
	/** 시간 (0-23) */
	hour: number;
	/** 해당 시간의 자전거 수 */
	bikeCount: number;
}

export interface TodayAvailableBike {
	/** 기준 시간戳 */
	timeStamp: string;
	/** 실제 관측된 시간별 자전거 수 */
	observedBikeCountByHour: BikeCountByHour[];
	/** 예측된 시간별 자전거 수 */
	predictedBikeCountByHour: BikeCountByHour[];
}

export interface RecentPost {
	/** 작성자 이름 */
	writer: string;
	/** 게시글 내용 */
	message: string;
}

export interface NearbyAvailableStation {
	/** 대여소 ID (타자 자체 아이디) */
	stationId: number;
	/** 대여소 number (서울시에서 정해준 아이디) */
	number: number;
	/** 대여소명 */
	name: string;
	/** 대여소 위치 경도 */
	longitude: number;
	/** 대여소 위치 위도 */
	latitude: number;
	/** 현재 위치와의 거리 (10m) */
	distance: number;
}

export interface Station {
	/** 대여소 ID */
	stationId: number;
	/** 대여소명 */
	name: string;
	/** 대여소 주소 */
	address: string;
	/** 대여소 위치 위도 */
	latitude: number;
	/** 대여소 위치 경도 */
	longitude: number;
	/** 운영 모드 목록 */
	operationMode: OperationMode[];
	/** 오늘의 자전거 수 예측 정보 */
	todayAvailableBike: TodayAvailableBike;
	/** 최근 게시글 목록 */
	recentPosts: RecentPost[];
	/** 근처 이용 가능한 대여소 목록 */
	nearbyAvailableStations: NearbyAvailableStation[];
}

export function getStation(params: GetStationRequest) {
	return http.get<Station>(`/stations/${params.id}`);
}
