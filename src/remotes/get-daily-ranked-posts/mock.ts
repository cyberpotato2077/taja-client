import { http, HttpResponse } from "msw";
import type { ListResponse } from "./index";

const mockDailyRankedPosts: ListResponse = {
	posts: [
		{
			stationId: 1,
			stationName: "강남구청역",
			rank: 1,
			postId: 1,
			writer: "김태자",
			createdAt: "2024-01-15T10:30:00Z",
			content: "오늘 이곳 자전거 많네요!",
			commentCount: 3,
			likeCount: 5,
			liked: false,
		},
		{
			stationId: 2,
			stationName: "서초동",
			rank: 2,
			postId: 2,
			writer: "이자전거",
			createdAt: "2024-01-15T09:15:00Z",
			content: "새로운 자전거가 추가되었어요",
			commentCount: 1,
			likeCount: 2,
			liked: true,
		},
	],
};

export const getDailyRankedPostsMock = http.get("/api/posts/rank/daily", () => {
	return HttpResponse.json<ListResponse>(mockDailyRankedPosts);
});
