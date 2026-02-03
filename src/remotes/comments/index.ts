import { http } from "@/utils/http";

export type CreateCommentRequest = {
	content: string;
};

export function joinBoard(stationId: number) {
	return http.post<string>(`/stations/${stationId}/posts/join`, {});
}

export function createComment(postId: number, request: CreateCommentRequest) {
	return http.post<string>(`/posts/${postId}/comments`, request);
}

export function deleteComment(commentId: number) {
	return http.delete<string>(`/posts/comments/${commentId}`);
}
