import { http } from "@/utils/http";

export interface Item {
	stationId: number;
	stationName: string;
	rank: number;
	postId: number;
	writer: string;
	createdAt: string;
	content: string;
	commentCount: number;
	likeCount: number;
	liked: boolean;
}

export interface ListResponse {
	posts: Item[];
}

export function getDailyRankedPosts() {
	return http.get<ListResponse>("/posts/rank/daily");
}
