import { CommentList } from "@/components/comment-list";
import { LayoutWithTop } from "@/components/layout-with-top";
import { stationQueryOptions } from "@/queries/station-query-options";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";

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
	const { data: postDetail } = useSuspenseQuery(
		stationQueryOptions.postDetail(Number(postId)),
	);

	return (
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
	);
}
