import { MAP_RESTRICTION } from "@/constants/maps";
import type {
	BikeCountByTimeResponse,
	NearbyAvailableStationDetailResponse,
	OperationMode,
	RecentPostResponse,
	StationDetailResponse,
} from "@/remotes/get-station";
import type { MapStationResponse } from "@/remotes/get-nearby-stations";

const getRandomNumber = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

/**
 * 기본 스테이션 정보 (맵에서 사용)
 */
interface BaseStation {
	stationId: number;
	number: string;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	bikeCount: number;
}

/**
 * 기본 스테이션 데이터 생성
 */
const createBaseStation = (index: number): BaseStation => ({
	stationId: index,
	number: String(index),
	name: `Station ${index}`,
	address: `Address for station ${index}`,
	latitude: getRandomNumber(MAP_RESTRICTION.south, MAP_RESTRICTION.north),
	longitude: getRandomNumber(MAP_RESTRICTION.west, MAP_RESTRICTION.east),
	bikeCount: Math.floor(Math.random() * 20),
});

/**
 * 초기에 한번만 생성되는 원천 데이터 (100개의 스테이션)
 */
const BASE_STATIONS: BaseStation[] = Array.from({ length: 100 }, (_, i) =>
	createBaseStation(i + 1),
);

/**
 * 맵 API용 스테이션 데이터로 변환
 */
export const toMapStationResponse = (
	station: BaseStation,
): MapStationResponse => ({
	stationId: station.stationId,
	number: station.stationId,
	bikeCount: station.bikeCount,
	latitude: station.latitude,
	longitude: station.longitude,
	requestedAt: new Date().toISOString(),
});

/**
 * 상세 정보 API용 스테이션 데이터로 변환
 */
export const toStationDetailResponse = (
	station: BaseStation,
): StationDetailResponse => {
	// operationMode
	const operationModes: OperationMode[] = [
		{ mode: "QR", rackCount: Math.floor(Math.random() * 10) + 5 },
	];
	if (Math.random() > 0.5) {
		operationModes.push({
			mode: "LCD",
			rackCount: Math.floor(Math.random() * 10) + 5,
		});
	}

	// todayAvailableBike
	const observedBikeCountByHour: BikeCountByTimeResponse[] = Array.from(
		{ length: new Date().getHours() + 1 },
		(_, i) => ({
			hour: i,
			bikeCount: Math.floor(Math.random() * 15),
		}),
	);
	const predictedBikeCountByHour: BikeCountByTimeResponse[] = Array.from(
		{ length: 24 - (new Date().getHours() + 1) },
		(_, i) => {
			const hour = new Date().getHours() + 1 + i;
			return {
				hour,
				bikeCount: Math.floor(Math.random() * 15),
			};
		},
	);

	// recentPosts
	const recentPosts: RecentPostResponse[] = Array.from(
		{ length: 3 },
		(_, i) => ({
			writer: `user_${i}`,
			message: `message ${i}`,
		}),
	);

	// nearbyAvailableStations - 현재 스테이션 근처 5개
	const nearbyAvailableStations: NearbyAvailableStationDetailResponse[] =
		BASE_STATIONS.filter((s) => s.stationId !== station.stationId)
			.slice(0, 5)
			.map((s) => ({
				stationId: s.stationId,
				number: s.number,
				name: s.name,
				longitude: s.longitude,
				latitude: s.latitude,
				distance: Math.random() * 1000,
			}));

	return {
		stationId: station.stationId,
		number: station.number,
		name: station.name,
		address: station.address,
		latitude: station.latitude,
		longitude: station.longitude,
		operationMode: operationModes,
		todayAvailableBike: {
			timeStamp: new Date().toISOString(),
			observedBikeCountByHour,
			predictedBikeCountByHour,
		},
		recentPosts: recentPosts,
		nearbyAvailableStations,
		hourlyAvailable: [],
		dailyAvailable: [],
		temperatureAvailable: [],
	};
};

/**
 * ID로 스테이션 찾기
 */
export const findStationById = (id: number): BaseStation | undefined => {
	return BASE_STATIONS.find((s) => s.stationId === id);
};

/**
 * 모든 스테이션 가져오기
 */
export const getAllStations = (): BaseStation[] => {
	return BASE_STATIONS;
};

/**
 * 맵 API용 모든 스테이션
 */
export const getAllMapStations = (): MapStationResponse[] => {
	return BASE_STATIONS.map(toMapStationResponse);
};
