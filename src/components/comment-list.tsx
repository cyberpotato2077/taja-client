import type { CommentItemResponse } from "@/remotes/get-post-detail";

interface CommentListProps {
	comments: CommentItemResponse[];
}

export function CommentList({ comments }: CommentListProps) {
	if (comments.length === 0) {
		return (
			<p className="text-gray-500 text-center py-8">아직 댓글이 없습니다.</p>
		);
	}

	return (
		<div className="space-y-3">
			{comments.map((comment) => (
				<div key={comment.commentId} className="bg-gray-50 rounded-lg p-3">
					<div className="flex items-start gap-3">
						<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
							<span className="text-xs text-green-600 font-medium">
								{comment.writer.charAt(0)}
							</span>
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-gray-900 mb-1">
								{comment.writer}
							</div>
							<div className="text-sm text-gray-700 mb-2">
								{comment.content}
							</div>
							<div className="text-xs text-gray-500">{comment.createdAt}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
