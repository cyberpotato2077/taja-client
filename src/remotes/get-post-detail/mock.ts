import {
	findPostById,
	toPostDetailResponse,
} from "@/mocks/data/posts";
import { http, HttpResponse } from "msw";
import type { PostDetailResponse } from "./index";

export const getPostDetailMock = http.get(
	"/api/posts/:postId",
	({ params }) => {
		const postId = Number(params.postId);

		console.log("msw:get :: /api/posts/:postId", { postId });

		// 공통 데이터 소스에서 게시글 찾기
		const post = findPostById(postId);

		if (!post) {
			return new HttpResponse(null, { status: 404 });
		}

		const postDetail = toPostDetailResponse(post);

		if (!postDetail) {
			return new HttpResponse(null, { status: 404 });
		}

		return HttpResponse.json<PostDetailResponse>(postDetail);
	},
);
