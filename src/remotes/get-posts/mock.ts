import { getPostsByStationId } from "@/mocks/data/posts";
import { http, HttpResponse } from "msw";
import type { PostListResponse } from "./index";

export const getPostsMock = http.get(
	"/api/stations/:stationId/posts",
	({ params, request }) => {
		const { stationId } = params;
		const stationIdNum = Number(stationId);

		// URL에서 쿼리 파라미터 가져오기
		const url = new URL(request.url);
		const size = Number(url.searchParams.get("size")) || 20;
		const cursor = url.searchParams.get("cursor");

		console.log("msw:get :: /api/stations/:stationId/posts", {
			stationId: stationIdNum,
			size,
			cursor,
		});

		// 공통 데이터 소스에서 게시글 가져오기
		const allPosts = getPostsByStationId(stationIdNum);

		// cursor가 있으면 해당 위치부터, 없으면 처음부터
		const startIndex = cursor ? Number(cursor) : 0;
		const endIndex = startIndex + size;
		const posts = allPosts.slice(startIndex, endIndex);

		// 다음 페이지가 있는지 확인
		const hasNext = endIndex < allPosts.length;
		const nextCursor = hasNext ? String(endIndex) : null;

		const response: PostListResponse = {
			posts,
			nextCursor: nextCursor || "",
		};

		return HttpResponse.json<PostListResponse>(response);
	},
);
