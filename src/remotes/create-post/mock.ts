import { addPost } from "@/mocks/data/posts";
import { http, HttpResponse } from "msw";
import type { CreatePostRequest } from "./index";

export const createPostMock = http.post(
	"/api/stations/:stationId/posts",
	async ({ request, params }) => {
		const stationId = Number(params.stationId);
		const body = (await request.json()) as CreatePostRequest;

		console.log("msw:post :: /api/stations/:stationId/posts", {
			stationId,
			body,
		});

		if (!body.content) {
			return HttpResponse.json(
				{ error: "Content is required" },
				{ status: 400 },
			);
		}

		// 새 게시글 추가 (현재 로그인한 사용자는 "나"로 표시)
		const newPost = addPost(stationId, {
			stationId,
			writer: "나",
			createdAt: new Date().toISOString(),
			content: body.content,
			commentCount: 0,
			likeCount: 0,
			liked: false,
			comments: [],
		});

		return HttpResponse.json(newPost);
	},
);
