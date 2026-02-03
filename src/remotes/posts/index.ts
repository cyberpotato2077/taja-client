import { http } from "@/utils/http";

export interface PostItem {
	stationId: number;
	postId: number;
	writer: string;
	createdAt: string;
	content: string;
	commentCount: number;
	likeCount: number;
	liked: boolean;
}

export interface PostListResponse {
	posts: PostItem[];
	nextCursor: string;
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

export interface CommentItem {
	commentId: number;
	writer: string;
	content: string;
	createdAt: string;
}

export interface PostLikeResponse {
	postId: number;
	likeCount: number;
}

export type GetPostsRequest = {
	stationId: number;
	sort?: string;
	cursor?: string;
	size?: number;
};

export type CreatePostRequest = {
	content: string;
};

export function getPosts(params: GetPostsRequest) {
	return http.get<PostListResponse>(`/stations/${params.stationId}/posts`, {
		sort: params.sort,
		cursor: params.cursor,
		size: params.size ?? 20,
	});
}

export function createPost(stationId: number, request: CreatePostRequest) {
	return http.post<string>(`/stations/${stationId}/posts`, request);
}

export function getPostDetail(postId: number) {
	return http.get<PostDetail>(`/posts/${postId}`);
}

export function deletePost(postId: number) {
	return http.delete<string>(`/posts/${postId}`);
}

export function likePost(postId: number) {
	return http.post<PostLikeResponse>(`/posts/${postId}/like`, {});
}

export function unlikePost(postId: number) {
	return http.delete<PostLikeResponse>(`/posts/${postId}/like`);
}
