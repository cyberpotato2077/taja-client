import { getFavoriteStationsMock } from "@/remotes/get-favorite-stations/handler";
import { getNearbyStationsMock } from "@/remotes/get-nearby-stations/mock";
import { getStationMock } from "@/remotes/get-station/mock";
import { getSearchStationsMock } from "@/remotes/search-stations/mock";

// Station Status
import { readStationStatusMock } from "@/remotes/station-status/mock";

import { readDistrictPointFileMock } from "@/remotes/read-district-point-file/mock";
// Weather
import { readWeatherHistoriesMock } from "@/remotes/read-weather-histories/mock";

import { calculateDayOfWeekStatisticsMock } from "@/remotes/calculate-day-of-week-statistics/mock";
import { calculateHourlyStatisticsMock } from "@/remotes/calculate-hourly-statistics/mock";
// Statistics
import { calculateTemperatureStatisticsMock } from "@/remotes/calculate-temperature-statistics/mock";

import { createPostMock } from "@/remotes/create-post/mock";
import { deletePostMock } from "@/remotes/delete-post/mock";
import { getPostDetailMock } from "@/remotes/get-post-detail/mock";
// Posts
import { getPostsMock } from "@/remotes/get-posts/mock";
import { likePostMock } from "@/remotes/like-post/mock";
import { unlikePostMock } from "@/remotes/unlike-post/mock";

import { createCommentMock } from "@/remotes/create-comment/mock";
import { deleteCommentMock } from "@/remotes/delete-comment/mock";
// Comments
import { joinBoardMock } from "@/remotes/join-board/mock";

// Station Manage
import { addFavoriteStationMock } from "@/remotes/add-favorite-station/mock";
import { deleteFavoriteStationMock } from "@/remotes/delete-favorite-station/mock";
import { healthCheckMock } from "@/remotes/health-check/mock";
import { isFavoriteStationMock } from "@/remotes/is-favorite-station/mock";
import { readStationFileMock } from "@/remotes/read-station-file/mock";

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
