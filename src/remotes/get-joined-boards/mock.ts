import { http, HttpResponse } from "msw";
import type { JoinedBoardsResponse } from "./index";

const mockJoinedBoards: JoinedBoardsResponse = {
	boards: [
		{
			stationId: 1,
			name: "강남구청역",
			lastContent: "오늘 자전거 많이 있어요!",
		},
		{
			stationId: 2,
			name: "서초동",
			lastContent: "새로운 자전거가 추가되었습니다.",
		},
	],
};

export const getJoinedBoardsMock = http.get("/api/member/boards", () => {
	return HttpResponse.json<JoinedBoardsResponse>(mockJoinedBoards);
});
