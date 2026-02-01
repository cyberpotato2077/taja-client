import { getFavoriteStationsMock } from "@/remotes/get-favorite-stations/handler";
import { getNearbyStationsMock } from "@/remotes/get-nearby-stations/mock";
import { getStationMock } from "@/remotes/get-station/mock";
import { getSearchStationsMock } from "@/remotes/search-stations/mock";

export const handlers = [
	getNearbyStationsMock,
	getStationMock,
	getSearchStationsMock,
	getFavoriteStationsMock,
];
