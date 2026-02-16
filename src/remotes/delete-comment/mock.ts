import { deleteComment } from "@/mocks/data/posts";
import { http, HttpResponse } from "msw";

export const deleteCommentMock = http.delete(
	"/api/posts/comments/:commentId",
	({ params }) => {
		const commentId = Number(params.commentId);

		console.log("msw:delete :: /api/posts/comments/:commentId", { commentId });

		const success = deleteComment(commentId);

		if (success) {
			return HttpResponse.json<string>("Comment deleted successfully");
		}

		return HttpResponse.json({ error: "Comment not found" }, { status: 404 });
	},
);
