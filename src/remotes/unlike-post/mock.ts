import { findPostById } from "@/mocks/data/posts";
import { http, HttpResponse } from "msw";
import type { PostLikeResponse } from "./index";

export const unlikePostMock = http.delete(
	"/api/posts/:postId/like",
	({ params }) => {
		const postId = Number(params.postId);

		console.log("msw:delete :: /api/posts/:postId/like", { postId });

		const post = findPostById(postId);

		if (!post) {
			return new HttpResponse(null, { status: 404 });
		}

		// 좋아요 상태면 좋아요 취소
		if (post.liked) {
			post.liked = false;
			post.likeCount -= 1;
		}

		return HttpResponse.json<PostLikeResponse>({
			postId,
			likeCount: post.likeCount,
		});
	},
);
