import { http, HttpResponse } from "msw";
import type { CreateCommentRequest } from "./index";

export const createCommentMock = http.post(
	"/api/posts/:postId/comments",
	async ({ request }) => {
		const body = (await request.json()) as CreateCommentRequest;

		if (body.content) {
			return HttpResponse.json<string>("Comment created successfully");
		}

		return HttpResponse.json({ error: "Content is required" }, { status: 400 });
	},
);
