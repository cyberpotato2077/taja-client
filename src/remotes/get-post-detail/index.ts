import { http } from "@/utils/http";

export interface CommentItem {
	commentId: number;
	writer: string;
	content: string;
	createdAt: string;
}

export interface PostDetail {
	postId: number;
	writer: string;
	createdAt: string;
	content: string;
	likeCount: number;
	commentCount: number;
	comments: CommentItem[];
	liked: boolean;
}

export function getPostDetail(postId: number) {
	return http.get<PostDetail>(`/posts/${postId}`);
}
