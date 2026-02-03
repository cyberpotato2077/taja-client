import { http } from "@/utils/http";

export type CreateCommentRequest = {
	content: string;
};

export function createComment(postId: number, request: CreateCommentRequest) {
	return http.post<string>(`/posts/${postId}/comments`, request);
}
