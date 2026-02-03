import { http, HttpResponse } from "msw";
import type { PostListResponse } from "./index";

const mockPosts: PostListResponse = {
	posts: [
		{
			stationId: 1,
			postId: 1,
			writer: "김태자",
			createdAt: "2024-01-15T10:30:00Z",
			content: "오늘 이곳 자전거 많네요!",
			commentCount: 3,
			likeCount: 5,
			liked: false,
		},
		{
			stationId: 1,
			postId: 2,
			writer: "이자전거",
			createdAt: "2024-01-15T09:15:00Z",
			content: "새로운 자전거가 추가되었어요",
			commentCount: 1,
			likeCount: 2,
			liked: true,
		},
	],
	nextCursor: "next-page-token",
};

export const getPostsMock = http.get("/api/stations/:stationId/posts", () => {
	return HttpResponse.json<PostListResponse>(mockPosts);
});
