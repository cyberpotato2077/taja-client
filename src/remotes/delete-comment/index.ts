import { http } from "@/utils/http";

export function deleteComment(commentId: number) {
	return http.delete<string>(`/posts/comments/${commentId}`);
}
