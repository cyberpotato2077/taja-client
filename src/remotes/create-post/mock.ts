import { http, HttpResponse } from "msw";
import type { CreatePostRequest } from "./index";

export const createPostMock = http.post(
	"/api/stations/:stationId/posts",
	async ({ request }) => {
		const body = (await request.json()) as CreatePostRequest;

		if (body.content) {
			return HttpResponse.json<string>("Post created successfully");
		}

		return HttpResponse.json({ error: "Content is required" }, { status: 400 });
	},
);
