import { http, HttpResponse } from "msw";
import type { PostLikeResponse } from "./index";

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
