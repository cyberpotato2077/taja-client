import { http } from "@/utils/http";

export type GetStationRequest = {
	id: number;
};

export interface OperationMode {
	mode: "LCD" | "QR";
	rackCount: number;
}

export interface BikeCountByHour {
	hour: number;
	bikeCount: number;
}

export interface TodayAvailableBike {
	timeStamp: string;
	observedBikeCountByHour: BikeCountByHour[];
	predictedBikeCountByHour: BikeCountByHour[];
}

export interface ChatRoomRecentMessage {
	nickname: string;
	message: string;
	isReply: boolean;
	replyToUserNickname?: string;
	replyToMessage?: string;
}

export interface NearbyAvailableStation {
	stationId: number;
	number: number;
	name: string;
	longitude: number;
	latitude: number;
	distance: number;
}

export interface Station {
	stationId: number;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	operationMode: OperationMode[];
	todayAvailableBike: TodayAvailableBike;
	chatRoomRecentMessages: ChatRoomRecentMessage[];
	nearbyAvailableStations: NearbyAvailableStation[];
}

export function getStation(params: GetStationRequest) {
	return http.get<Station>(`/stations/${params.id}`);
}
