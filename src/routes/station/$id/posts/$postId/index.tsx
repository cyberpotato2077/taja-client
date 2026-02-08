import { CommentList } from "@/components/comment-list";
import { LayoutWithTop } from "@/components/layout-with-top";
import { stationQueryOptions } from "@/queries/station-query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/station/$id/posts/$postId/")({
	component: RouteComponent,
	loader: ({ params }) => ({
		postDetailQueryOptions: stationQueryOptions.postDetail(
			Number(params.postId),
		),
	}),
});

function RouteComponent() {
	const router = useRouter();
	const { postDetailQueryOptions: queryOptions } = Route.useLoaderData();
	const { data: postDetail } = useSuspenseQuery(queryOptions);

	return (
		<LayoutWithTop
			showBackButton
			onBackButtonClick={() => router.history.back()}
		>
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
		</LayoutWithTop>
	);
}
