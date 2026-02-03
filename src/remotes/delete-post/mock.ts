import { http, HttpResponse } from "msw";

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
