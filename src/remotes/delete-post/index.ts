import { http } from "@/utils/http";

export function deletePost(postId: number) {
	return http.delete<string>(`/posts/${postId}`);
}
