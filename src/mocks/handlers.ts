import { getFavoriteStationsMock } from "@/remotes/get-favorite-stations/mock";
import { getNearbyStationsMock } from "@/remotes/get-nearby-stations/mock";
import { getStationMock } from "@/remotes/get-station/mock";
import { getSearchStationsMock } from "@/remotes/search-stations/mock";

// Member
import { getMemberMock } from "@/remotes/get-member/mock";
import { deleteMemberMock } from "@/remotes/delete-member/mock";

// Authentication
import {
	checkNameDuplicateMock,
	loginMock,
	logoutMock,
	reissueTokenMock,
	sendEmailMock,
	signupMock,
	verifyEmailMock,
} from "@/remotes/auth/mock";
import { getJoinedBoardsMock } from "@/remotes/get-joined-boards/mock";

// Station Status
import { readStationStatusMock } from "@/remotes/station-status/mock";

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
import { getDailyRankedPostsMock } from "@/remotes/get-daily-ranked-posts/mock";
import { healthCheckMock } from "@/remotes/health-check/mock";
import { isFavoriteStationMock } from "@/remotes/is-favorite-station/mock";

export const handlers = [
	// Authentication
	loginMock,
	signupMock,
	logoutMock,
	reissueTokenMock,
	checkNameDuplicateMock,
	sendEmailMock,
	verifyEmailMock,

	// Member
	getMemberMock,
	deleteMemberMock,
	getJoinedBoardsMock,

	// Existing handlers
	getNearbyStationsMock,
	getStationMock,
	getSearchStationsMock,
	getFavoriteStationsMock,

	// Station Status
	readStationStatusMock,

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
	healthCheckMock,

	// Rank
	getDailyRankedPostsMock,
];
