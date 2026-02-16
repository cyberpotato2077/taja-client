import { findPostById } from "@/mocks/data/posts";
import { http, HttpResponse } from "msw";
import type { PostLikeResponse } from "./index";

export const likePostMock = http.post(
	"/api/posts/:postId/like",
	({ params }) => {
		const postId = Number(params.postId);

		console.log("msw:post :: /api/posts/:postId/like", { postId });

		const post = findPostById(postId);

		if (!post) {
			return new HttpResponse(null, { status: 404 });
		}

		// 이미 좋아요 상태가 아니면 좋아요 추가
		if (!post.liked) {
			post.liked = true;
			post.likeCount += 1;
		}

		return HttpResponse.json<PostLikeResponse>({
			postId,
			likeCount: post.likeCount,
		});
	},
);
