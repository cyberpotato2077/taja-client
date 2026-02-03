import { http } from "@/utils/http";

export interface PostLikeResponse {
	postId: number;
	likeCount: number;
}

export function unlikePost(postId: number) {
	return http.delete<PostLikeResponse>(`/posts/${postId}/like`);
}
