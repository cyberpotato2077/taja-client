import { http } from "@/utils/http";

export interface PostItem {
	stationId: number;
	postId: number;
	writer: string;
	createdAt: string;
	content: string;
	commentCount: number;
	likeCount: number;
	liked: boolean;
}

export interface PostListResponse {
	posts: PostItem[];
	nextCursor: string;
}

export type GetPostsRequest = {
	stationId: number;
	sort?: string;
	cursor?: string;
	size?: number;
};

export function getPosts(params: GetPostsRequest) {
	return http.get<PostListResponse>(`/stations/${params.stationId}/posts`, {
		sort: params.sort,
		cursor: params.cursor,
		size: params.size ?? 20,
	});
}
