import { http, HttpResponse } from "msw";
import type {
	CreatePostRequest,
	PostDetail,
	PostLikeResponse,
	PostListResponse,
} from "./index";

// Mock data
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

const mockPostDetail: PostDetail = {
	postId: 1,
	writer: "김태자",
	createdAt: "2024-01-15T10:30:00Z",
	content:
		"오늘 이곳 자전거 많네요! 새로운 자전거가 추가되었어요. 정말 좋네요!",
	likeCount: 5,
	commentCount: 3,
	comments: [
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
	],
	liked: false,
};

export const getPostsMock = http.get("/api/stations/:stationId/posts", () => {
	return HttpResponse.json<PostListResponse>(mockPosts);
});

export const createPostMock = http.post(
	"/api/stations/:stationId/posts",
	async ({ request }) => {
		const body = (await request.json()) as CreatePostRequest;

		if (body.content) {
			return HttpResponse.json<string>("Post created successfully");
		}

		return HttpResponse.json({ error: "Content is required" }, { status: 400 });
	},
);

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

export const deletePostMock = http.delete(
	"/api/posts/:postId",
	({ params }) => {
		const postId = Number(params.postId);

		if (postId === 1) {
			return HttpResponse.json<string>("Post deleted successfully");
		}

		return HttpResponse.json({ error: "Post not found" }, { status: 404 });
	},
);

export const likePostMock = http.post(
	"/api/posts/:postId/like",
	({ params }) => {
		const postId = Number(params.postId);

		return HttpResponse.json<PostLikeResponse>({
			postId,
			likeCount: 6, // incremented
		});
	},
);

export const unlikePostMock = http.delete(
	"/api/posts/:postId/like",
	({ params }) => {
		const postId = Number(params.postId);

		return HttpResponse.json<PostLikeResponse>({
			postId,
			likeCount: 4, // decremented
		});
	},
);
