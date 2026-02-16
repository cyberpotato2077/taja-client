import { deletePost } from "@/mocks/data/posts";
import { http, HttpResponse } from "msw";

export const deletePostMock = http.delete(
	"/api/posts/:postId",
	({ params }) => {
		const postId = Number(params.postId);

		console.log("msw:delete :: /api/posts/:postId", { postId });

		const success = deletePost(postId);

		if (success) {
			return HttpResponse.json<string>("Post deleted successfully");
		}

		return HttpResponse.json({ error: "Post not found" }, { status: 404 });
	},
);
