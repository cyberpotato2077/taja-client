import { http, HttpResponse } from "msw";
import type { CommentItem, PostDetail } from "./index";

const mockComments: CommentItem[] = [
	{
		commentId: 1,
		writer: "박라이더",
		content: "정말 그러네요!",
		createdAt: "2024-01-15T11:00:00Z",
	},
	{
		commentId: 2,
		writer: "최페달",
		content: "저도 방문해볼게요",
		createdAt: "2024-01-15T11:30:00Z",
	},
];

const mockPostDetail: PostDetail = {
	postId: 1,
	writer: "김태자",
	createdAt: "2024-01-15T10:30:00Z",
	content:
		"오늘 이곳 자전거 많네요! 새로운 자전거가 추가되었어요. 정말 좋네요!",
	likeCount: 5,
	commentCount: 3,
	comments: mockComments,
	liked: false,
};

export const getPostDetailMock = http.get(
	"/api/posts/:postId",
	({ params }) => {
		const postId = Number(params.postId);

		if (postId === 1) {
			return HttpResponse.json<PostDetail>(mockPostDetail);
		}

		return HttpResponse.json({ error: "Post not found" }, { status: 404 });
	},
);
