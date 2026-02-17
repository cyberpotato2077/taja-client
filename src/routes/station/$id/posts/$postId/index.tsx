import { CommentList } from "@/components/comment-list";
import { LayoutWithTop } from "@/components/layout-with-top";
import { useAuth } from "@/hooks/use-auth";
import { authQueryOptions } from "@/queries/auth-query-options";
import { stationQueryOptions } from "@/queries/station-query-options";
import { createComment } from "@/remotes/create-comment";
import { deletePost } from "@/remotes/delete-post";
import { Suspense } from "@suspensive/react";
import { useMutation, useQueryClient, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams, useRouter, useNavigate } from "@tanstack/react-router";
import { Send, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/station/$id/posts/$postId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const { postId } = useParams({ from: Route.id });

	return (
		<LayoutWithTop
			showBackButton
			onBackButtonClick={() => router.history.back()}
		>
			<Suspense fallback={<div>Loading...</div>}>
				<PostDetail postId={postId} />
			</Suspense>
		</LayoutWithTop>
	);
}

function PostDetail({ postId }: { postId: string }) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { id: stationId } = useParams({ from: "/station/$id/posts/$postId/" });
	const { isLoggedIn } = useAuth();

	const { data: postDetail } = useSuspenseQuery(
		stationQueryOptions.postDetail(Number(postId)),
	);

	const { data: currentUser } = useQuery({
		...authQueryOptions.member(),
		enabled: isLoggedIn,
	});

	const [comment, setComment] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const createCommentMutation = useMutation({
		mutationFn: (content: string) =>
			createComment(Number(postId), { content }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["station", "postDetail", Number(postId)],
			});
			setComment("");
			setIsSubmitting(false);
		},
		onError: (error) => {
			console.error("Failed to create comment:", error);
			alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
			setIsSubmitting(false);
		},
	});

	const deletePostMutation = useMutation({
		mutationFn: () => deletePost(Number(postId)),
		onSuccess: () => {
			navigate({
				to: "/station/$id/posts",
				params: { id: stationId },
			});
		},
		onError: (error) => {
			console.error("Failed to delete post:", error);
			alert("게시글 삭제에 실패했습니다.");
		},
	});

	const handleSubmitComment = (e: React.FormEvent) => {
		e.preventDefault();

		if (!comment.trim()) {
			return;
		}

		if (comment.length > 200) {
			alert("200자 이내로 작성해주세요.");
			return;
		}

		setIsSubmitting(true);
		createCommentMutation.mutate(comment);
	};

	const handleDeletePost = () => {
		if (confirm("정말 이 게시글을 삭제하시겠습니까?")) {
			deletePostMutation.mutate();
		}
	};

	const isPostOwner = currentUser && postDetail.writer === currentUser.name;

	return (
		<div className="relative min-h-full pb-20">
			{/* 컨텐츠 영역 */}
			<div className="p-4">
				<div className="bg-white rounded-lg p-4 mb-6 border">
					<div className="flex items-start gap-3 mb-4">
						<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
							<span className="text-sm text-blue-600 font-medium">
								{postDetail.writer.charAt(0)}
							</span>
						</div>
						<div className="flex-1">
							<div className="flex items-center justify-between mb-2">
								<div className="font-medium text-gray-900">
									{postDetail.writer}
								</div>
								{isPostOwner && (
									<button
										type="button"
										onClick={handleDeletePost}
										className="text-red-500 hover:text-red-700 p-1 transition-colors"
										disabled={deletePostMutation.isPending}
									>
										<Trash2 className="w-5 h-5" />
									</button>
								)}
							</div>
							<div className="text-gray-700 mb-3">{postDetail.content}</div>
							<div className="flex items-center gap-4 text-sm text-gray-500">
								<span>{postDetail.createdAt}</span>
								<span>👍 {postDetail.likeCount}</span>
								<span>💬 {postDetail.commentCount}</span>
							</div>
						</div>
					</div>
				</div>

				<h3 className="text-lg font-semibold mb-4">
					댓글 ({postDetail.comments.length})
				</h3>
				<CommentList
					comments={postDetail.comments}
					currentUserName={currentUser?.name}
					postId={Number(postId)}
				/>
			</div>

			{/* 하단 고정 댓글 입력 폼 */}
			<div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 mt-4">
				<form onSubmit={handleSubmitComment} className="flex gap-2 max-w-screen-sm mx-auto">
					<input
						type="text"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="댓글을 입력하세요..."
						className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						maxLength={200}
						disabled={isSubmitting}
					/>
					<button
						type="submit"
						disabled={isSubmitting || !comment.trim()}
						className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<Send className="w-5 h-5" />
					</button>
				</form>
			</div>
		</div>
	);
}
