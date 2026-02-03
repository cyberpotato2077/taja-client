import { http } from "@/utils/http";

export interface PostLikeResponse {
	postId: number;
	likeCount: number;
}

export function likePost(postId: number) {
	return http.post<PostLikeResponse>(`/posts/${postId}/like`, {});
}
