import { http, HttpResponse } from "msw";

export const deleteCommentMock = http.delete(
	"/api/posts/comments/:commentId",
	() => {
		return HttpResponse.json<string>("Comment deleted successfully");
	},
);
