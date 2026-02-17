import { deleteComment } from "@/remotes/delete-comment";
import type { CommentItemResponse } from "@/remotes/get-post-detail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

interface CommentListProps {
	comments: CommentItemResponse[];
	currentUserName?: string;
	postId: number;
}

export function CommentList({
	comments,
	currentUserName,
	postId,
}: CommentListProps) {
	const queryClient = useQueryClient();

	const deleteCommentMutation = useMutation({
		mutationFn: (commentId: number) => deleteComment(commentId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["station", "postDetail", postId],
			});
		},
		onError: (error) => {
			console.error("Failed to delete comment:", error);
			alert("댓글 삭제에 실패했습니다.");
		},
	});

	const handleDeleteComment = (commentId: number) => {
		if (confirm("정말 이 댓글을 삭제하시겠습니까?")) {
			deleteCommentMutation.mutate(commentId);
		}
	};

	if (comments.length === 0) {
		return (
			<p className="text-gray-500 text-center py-8">아직 댓글이 없습니다.</p>
		);
	}

	return (
		<div className="space-y-3">
			{comments.map((comment) => {
				const isOwner = currentUserName && comment.writer === currentUserName;

				return (
					<div key={comment.commentId} className="bg-gray-50 rounded-lg p-3">
						<div className="flex items-start gap-3">
							<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
								<span className="text-xs text-green-600 font-medium">
									{comment.writer.charAt(0)}
								</span>
							</div>
							<div className="flex-1">
								<div className="flex items-center justify-between mb-1">
									<div className="text-sm font-medium text-gray-900">
										{comment.writer}
									</div>
									{isOwner && (
										<button
											type="button"
											onClick={() => handleDeleteComment(comment.commentId)}
											className="text-red-500 hover:text-red-700 p-1 transition-colors"
											disabled={deleteCommentMutation.isPending}
										>
											<Trash2 className="w-4 h-4" />
										</button>
									)}
								</div>
								<div className="text-sm text-gray-700 mb-2">
									{comment.content}
								</div>
								<div className="text-xs text-gray-500">{comment.createdAt}</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
