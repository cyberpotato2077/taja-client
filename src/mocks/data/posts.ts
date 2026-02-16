import type { PostItem } from "@/remotes/get-posts";
import type {
	CommentItemResponse,
	PostDetailResponse,
} from "@/remotes/get-post-detail";
import type { RecentPostResponse } from "@/remotes/get-station";

/**
 * 공통 게시글 데이터 저장소
 * 스테이션별로 게시글을 관리하며, RecentMessages와 게시판 페이지에서 공유
 */

interface MockPost extends PostItem {
	// PostItem의 모든 필드 포함
	comments?: CommentItemResponse[]; // 댓글 정보 추가
}

/**
 * 원천 게시글 데이터
 * stationId별로 게시글을 매핑
 */
const MOCK_POSTS_BY_STATION: Record<number, MockPost[]> = {};

/**
 * 초기 게시글 데이터 생성
 */
const samplePostContents = [
	"오늘 이곳 자전거 많네요!",
	"새로운 자전거가 추가되었어요",
	"날씨 좋아서 자전거 타기 딱이네요",
	"이 대여소 위치가 정말 좋아요",
	"자전거 상태가 깨끗해서 좋습니다",
	"퇴근길에 들르기 편해요",
	"주차 공간이 넉넉해서 좋네요",
	"앱으로 예약하니 편리하네요",
	"근처 카페 가는 데 유용해요",
	"자전거 도로가 잘 되어있어요",
];

const sampleWriters = [
	"김태자",
	"이자전거",
	"박따릉",
	"최바이크",
	"정페달",
	"강라이딩",
	"윤핸들",
	"임체인",
	"한기어",
	"조벨",
];

const sampleComments = [
	"정말 그러네요!",
	"저도 방문해볼게요",
	"유용한 정보 감사합니다",
	"동감합니다!",
	"좋은 의견이네요",
	"저도 같은 생각이에요",
	"다음에 가봐야겠어요",
	"공감합니다",
];

/**
 * 댓글 생성
 */
const generateComments = (
	postId: number,
	count: number,
	postCreatedAt: string,
): CommentItemResponse[] => {
	const comments: CommentItemResponse[] = [];
	const postDate = new Date(postCreatedAt);

	for (let i = 0; i < count; i++) {
		const commentDate = new Date(postDate);
		commentDate.setMinutes(commentDate.getMinutes() + (i + 1) * 30); // 30분 간격으로 댓글

		comments.push({
			commentId: postId * 100 + i + 1,
			writer: sampleWriters[Math.floor(Math.random() * sampleWriters.length)],
			content:
				sampleComments[Math.floor(Math.random() * sampleComments.length)],
			createdAt: commentDate.toISOString(),
		});
	}

	return comments;
};

/**
 * 스테이션별로 5-10개의 게시글 생성
 */
const generatePostsForStation = (stationId: number): MockPost[] => {
	const postCount = Math.floor(Math.random() * 6) + 5; // 5-10개
	const posts: MockPost[] = [];

	for (let i = 0; i < postCount; i++) {
		const daysAgo = Math.floor(Math.random() * 30); // 0-30일 전
		const hoursAgo = Math.floor(Math.random() * 24);
		const createdAt = new Date();
		createdAt.setDate(createdAt.getDate() - daysAgo);
		createdAt.setHours(createdAt.getHours() - hoursAgo);

		const commentCount = Math.floor(Math.random() * 10);
		const postId = stationId * 1000 + i + 1;

		posts.push({
			stationId,
			postId, // 고유한 postId 생성
			writer: sampleWriters[Math.floor(Math.random() * sampleWriters.length)],
			createdAt: createdAt.toISOString(),
			content:
				samplePostContents[
					Math.floor(Math.random() * samplePostContents.length)
				],
			commentCount,
			likeCount: Math.floor(Math.random() * 20),
			liked: Math.random() > 0.7, // 30% 확률로 좋아요
			comments: generateComments(postId, commentCount, createdAt.toISOString()),
		});
	}

	// 최신순 정렬 (createdAt 기준 내림차순)
	return posts.sort(
		(a, b) =>
			new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
	);
};

/**
 * 스테이션의 게시글 가져오기 (없으면 생성)
 */
export const getPostsByStationId = (stationId: number): MockPost[] => {
	if (!MOCK_POSTS_BY_STATION[stationId]) {
		MOCK_POSTS_BY_STATION[stationId] = generatePostsForStation(stationId);
	}
	return MOCK_POSTS_BY_STATION[stationId];
};

/**
 * 스테이션의 최근 게시글 3개를 RecentPostResponse 형태로 변환
 */
export const getRecentPostsForStation = (
	stationId: number,
): RecentPostResponse[] => {
	const posts = getPostsByStationId(stationId);
	return posts.slice(0, 3).map((post) => ({
		postId: post.postId,
		writer: post.writer,
		message: post.content,
	}));
};

/**
 * 특정 게시글 ID로 찾기
 */
export const findPostById = (postId: number): MockPost | undefined => {
	for (const posts of Object.values(MOCK_POSTS_BY_STATION)) {
		const post = posts.find((p) => p.postId === postId);
		if (post) return post;
	}
	return undefined;
};

/**
 * 게시글을 PostDetailResponse로 변환
 */
export const toPostDetailResponse = (
	post: MockPost,
): PostDetailResponse | undefined => {
	if (!post) return undefined;

	return {
		postId: post.postId,
		writer: post.writer,
		createdAt: post.createdAt,
		content: post.content,
		likeCount: post.likeCount,
		commentCount: post.commentCount,
		comments: post.comments || [],
		liked: post.liked,
	};
};

/**
 * 새 게시글 추가
 */
export const addPost = (stationId: number, post: Omit<MockPost, "postId">) => {
	const posts = getPostsByStationId(stationId);
	const newPostId =
		Math.max(...posts.map((p) => p.postId), stationId * 1000) + 1;

	const newPost: MockPost = {
		...post,
		postId: newPostId,
	};

	posts.unshift(newPost); // 맨 앞에 추가
	return newPost;
};

/**
 * 게시글 삭제
 */
export const deletePost = (postId: number): boolean => {
	for (const posts of Object.values(MOCK_POSTS_BY_STATION)) {
		const index = posts.findIndex((p) => p.postId === postId);
		if (index !== -1) {
			posts.splice(index, 1);
			return true;
		}
	}
	return false;
};

/**
 * 게시글 좋아요 토글
 */
export const togglePostLike = (postId: number): MockPost | undefined => {
	for (const posts of Object.values(MOCK_POSTS_BY_STATION)) {
		const post = posts.find((p) => p.postId === postId);
		if (post) {
			post.liked = !post.liked;
			post.likeCount += post.liked ? 1 : -1;
			return post;
		}
	}
	return undefined;
};

/**
 * 댓글 추가
 */
export const addComment = (
	postId: number,
	content: string,
): CommentItemResponse | undefined => {
	const post = findPostById(postId);
	if (!post) return undefined;

	if (!post.comments) {
		post.comments = [];
	}

	const newCommentId =
		post.comments.length > 0
			? Math.max(...post.comments.map((c) => c.commentId)) + 1
			: postId * 100 + 1;

	const newComment: CommentItemResponse = {
		commentId: newCommentId,
		writer: "나",
		content,
		createdAt: new Date().toISOString(),
	};

	post.comments.push(newComment);
	post.commentCount = post.comments.length;

	return newComment;
};

/**
 * 댓글 삭제
 */
export const deleteComment = (commentId: number): boolean => {
	for (const posts of Object.values(MOCK_POSTS_BY_STATION)) {
		for (const post of posts) {
			if (!post.comments) continue;

			const index = post.comments.findIndex((c) => c.commentId === commentId);
			if (index !== -1) {
				post.comments.splice(index, 1);
				post.commentCount = post.comments.length;
				return true;
			}
		}
	}
	return false;
};
