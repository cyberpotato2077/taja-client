import { http } from "@/utils/http";

export type GetStationRequest = {
	/** 대여소 ID */
	stationId: number;
};

export interface OperationMode {
	mode: string;
	rackCount: number;
}

export interface BikeCountByTimeResponse {
	hour: number;
	bikeCount: number;
}

export interface TodayAvailableBikeResponse {
	timeStamp: string;
	observedBikeCountByHour: BikeCountByTimeResponse[];
	predictedBikeCountByHour: BikeCountByTimeResponse[];
}

export interface RecentPostResponse {
	postId: number;
	writer: string;
	message: string;
}

export interface NearbyAvailableStationDetailResponse {
	stationId: number;
	number: string;
	name: string;
	latitude: number;
	longitude: number;
	distance: number;
}

export interface HourlyAvailableItemResponse {
	hour: number;
	count: number;
	baseDate: string;
}

export interface DailyAvailableItemResponse {
	day: string;
	count: number;
	baseDate: string;
}

export interface TemperatureAvailableItemResponse {
	temperature: number;
	count: number;
	baseDate: string;
}

export interface StationDetailResponse {
	stationId: number;
	number: string;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	operationMode: OperationMode[];
	todayAvailableBike: TodayAvailableBikeResponse;
	recentPosts: RecentPostResponse[];
	nearbyAvailableStations: NearbyAvailableStationDetailResponse[];
	hourlyAvailable: HourlyAvailableItemResponse[];
	dailyAvailable: DailyAvailableItemResponse[];
	temperatureAvailable: TemperatureAvailableItemResponse[];
}

export function getStation(params: GetStationRequest) {
	return http.get<StationDetailResponse>(`/stations/${params.stationId}`);
}
