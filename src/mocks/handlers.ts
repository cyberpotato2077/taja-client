// Comments
import {
	createCommentMock,
	deleteCommentMock,
	joinBoardMock,
} from "@/remotes/comments/mock";
import { getFavoriteStationsMock } from "@/remotes/get-favorite-stations/handler";
import { getNearbyStationsMock } from "@/remotes/get-nearby-stations/mock";
import { getStationMock } from "@/remotes/get-station/mock";
// Posts
import {
	createPostMock,
	deletePostMock,
	getPostDetailMock,
	getPostsMock,
	likePostMock,
	unlikePostMock,
} from "@/remotes/posts/mock";
import { getSearchStationsMock } from "@/remotes/search-stations/mock";
// Station Manage
import {
	addFavoriteStationMock,
	deleteFavoriteStationMock,
	healthCheckMock,
	isFavoriteStationMock,
	readStationFileMock,
} from "@/remotes/station-manage/mock";
// Station Status
import { readStationStatusMock } from "@/remotes/station-status/mock";
// Statistics
import {
	calculateDayOfWeekStatisticsMock,
	calculateHourlyStatisticsMock,
	calculateTemperatureStatisticsMock,
} from "@/remotes/statistics/mock";
// Weather
import {
	readDistrictPointFileMock,
	readWeatherHistoriesMock,
} from "@/remotes/weather/mock";

export const handlers = [
	// Existing handlers
	getNearbyStationsMock,
	getStationMock,
	getSearchStationsMock,
	getFavoriteStationsMock,

	// Station Status
	readStationStatusMock,

	// Weather
	readWeatherHistoriesMock,
	readDistrictPointFileMock,

	// Statistics
	calculateTemperatureStatisticsMock,
	calculateHourlyStatisticsMock,
	calculateDayOfWeekStatisticsMock,

	// Posts
	getPostsMock,
	createPostMock,
	getPostDetailMock,
	deletePostMock,
	likePostMock,
	unlikePostMock,

	// Comments
	joinBoardMock,
	createCommentMock,
	deleteCommentMock,

	// Station Manage
	addFavoriteStationMock,
	deleteFavoriteStationMock,
	isFavoriteStationMock,
	readStationFileMock,
	healthCheckMock,
];
