import { http, HttpResponse } from "msw";
import type { PostLikeResponse } from "./index";

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
