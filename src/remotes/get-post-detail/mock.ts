import { http, HttpResponse } from "msw";
import type { CommentItemResponse, PostDetailResponse } from "./index";

const mockComments: CommentItemResponse[] = [
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

const mockPostDetail: PostDetailResponse = {
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

		// postId가 1이면 원본 mockPostDetail 사용
		if (postId === 1) {
			return HttpResponse.json<PostDetailResponse>(mockPostDetail);
		}

		// 다른 postId면 postId에 맞게 데이터 생성
		const postDetail: PostDetailResponse = {
			postId,
			writer: `유저${postId}`,
			createdAt: "2024-01-15T10:30:00Z",
			content: `게시물 ${postId}의 내용입니다. 이곳은 자전거 대여소에 대한 이야기를 나누는 공간입니다.`,
			likeCount: Math.floor(Math.random() * 20) + 1,
			commentCount: Math.floor(Math.random() * 10) + 1,
			comments: [
				{
					commentId: postId * 100 + 1,
					writer: "댓글작성자1",
					content: `게시물 ${postId}에 대한 첫 번째 댓글입니다.`,
					createdAt: "2024-01-15T11:00:00Z",
				},
				{
					commentId: postId * 100 + 2,
					writer: "댓글작성자2",
					content: `게시물 ${postId}에 대한 두 번째 댓글입니다.`,
					createdAt: "2024-01-15T11:30:00Z",
				},
			],
			liked: Math.random() > 0.5,
		};

		return HttpResponse.json<PostDetailResponse>(postDetail);
	},
);
