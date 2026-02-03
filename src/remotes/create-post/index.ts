import { http } from "@/utils/http";

export type CreatePostRequest = {
	content: string;
};

export function createPost(stationId: number, request: CreatePostRequest) {
	return http.post<string>(`/stations/${stationId}/posts`, request);
}
