import { http } from "@/utils/http";

export interface CommentItemResponse {
	commentId: number;
	writer: string;
	content: string;
	createdAt: string;
}

export interface PostDetailResponse {
	postId: number;
	writer: string;
	createdAt: string;
	content: string;
	likeCount: number;
	commentCount: number;
	comments: CommentItemResponse[];
	liked: boolean;
}

export function getPostDetail(postId: number) {
	return http.get<PostDetailResponse>(`/posts/${postId}`);
}
