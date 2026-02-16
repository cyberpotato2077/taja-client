import { addComment } from "@/mocks/data/posts";
import { http, HttpResponse } from "msw";
import type { CreateCommentRequest } from "./index";

export const createCommentMock = http.post(
	"/api/posts/:postId/comments",
	async ({ request, params }) => {
		const postId = Number(params.postId);
		const body = (await request.json()) as CreateCommentRequest;

		console.log("msw:post :: /api/posts/:postId/comments", {
			postId,
			body,
		});

		if (!body.content) {
			return HttpResponse.json(
				{ error: "Content is required" },
				{ status: 400 },
			);
		}

		const newComment = addComment(postId, body.content);

		if (!newComment) {
			return HttpResponse.json({ error: "Post not found" }, { status: 404 });
		}

		return HttpResponse.json(newComment);
	},
);
