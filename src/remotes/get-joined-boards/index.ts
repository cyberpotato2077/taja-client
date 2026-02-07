import { http } from "@/utils/http";

export interface JoinedBoardItemResponse {
	stationId: number;
	name: string;
	lastContent: string;
}

export interface JoinedBoardsResponse {
	boards: JoinedBoardItemResponse[];
}

export function getJoinedBoards() {
	return http.get<JoinedBoardsResponse>("/member/boards");
}
