import { http, HttpResponse } from "msw";
import { MAP_RESTRICTION } from "@/constants/maps";
import type {
	StationDetail,
	OperationMode,
	BikeCountByHour,
	ChatRoomRecentMessage,
	NearbyAvailableStation,
} from "./index";

const getRandomNumber = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

const createMockStationDetail = (id: number): StationDetail => {
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
	const observedBikeCountByHour: BikeCountByHour[] = Array.from(
		{ length: new Date().getHours() + 1 },
		(_, i) => ({
			hour: i,
			bikeCount: Math.floor(Math.random() * 15),
		}),
	);
	const predictedBikeCountByHour: BikeCountByHour[] = Array.from(
		{ length: 24 - (new Date().getHours() + 1) },
		(_, i) => {
			const hour = new Date().getHours() + 1 + i;
			return {
				hour,
				bikeCount: Math.floor(Math.random() * 15),
			};
		},
	);

	// chatRoomRecentMessages
	const chatRoomRecentMessages: ChatRoomRecentMessage[] = Array.from(
		{ length: 3 },
		(_, i) => {
			const isReply = Math.random() > 0.5;
			return {
				nickname: `user_${i}`,
				message: `message ${i}`,
				isReply,
				replyToUserNickname: isReply ? `user_replied_${i}` : undefined,
				replyToMessage: isReply ? `message_replied_${i}` : undefined,
			};
		},
	);

	// nearbyAvailableStations
	const nearbyAvailableStations: NearbyAvailableStation[] = Array.from(
		{ length: 5 },
		(_, i) => ({
			stationId: id + i + 1,
			number: id + i + 1,
			name: `Nearby Station ${id + i + 1}`,
			longitude: getRandomNumber(MAP_RESTRICTION.west, MAP_RESTRICTION.east),
			latitude: getRandomNumber(MAP_RESTRICTION.south, MAP_RESTRICTION.north),
			distance: Math.random() * 1000,
		}),
	);

	return {
		stationId: id,
		name: `Station ${id}`,
		address: `Address for station ${id}`,
		latitude: getRandomNumber(MAP_RESTRICTION.south, MAP_RESTRICTION.north),
		longitude: getRandomNumber(MAP_RESTRICTION.west, MAP_RESTRICTION.east),
		operationMode: operationModes,
		todayAvailableBike: {
			timeStamp: new Date().toISOString(),
			observedBikeCountByHour,
			predictedBikeCountByHour,
		},
		chatRoomRecentMessages,
		nearbyAvailableStations,
	};
};

export const getStationMock = http.get("/api/stations/:id", ({ params }) => {
	const { id } = params;
	const stationId = Number(id);

	console.log("msw:get :: /api/stations/:id", {
		id: stationId,
	});

	return HttpResponse.json<StationDetail>(createMockStationDetail(stationId));
});
