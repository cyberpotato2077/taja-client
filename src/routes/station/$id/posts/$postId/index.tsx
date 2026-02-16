import { CommentList } from "@/components/comment-list";
import { LayoutWithTop } from "@/components/layout-with-top";
import { stationQueryOptions } from "@/queries/station-query-options";
import { createComment } from "@/remotes/create-comment";
import { Suspense } from "@suspensive/react";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";
import { Send } from "lucide-react";
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
	const { data: postDetail } = useSuspenseQuery(
		stationQueryOptions.postDetail(Number(postId)),
	);

	const [comment, setComment] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const createCommentMutation = useMutation({
		mutationFn: (content: string) =>
			createComment(Number(postId), { content }),
		onSuccess: () => {
			// 게시글 상세 쿼리 무효화하여 새로고침
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
							<div className="font-medium text-gray-900 mb-2">
								{postDetail.writer}
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
				<CommentList comments={postDetail.comments} />
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
