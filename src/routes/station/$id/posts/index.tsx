import { LayoutWithTop } from "@/components/layout-with-top";
import { PostList } from "@/components/post-list";
import { stationQueryOptions } from "@/queries/station-query-options";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/station/$id/posts/")({
	component: RouteComponent,
	loader: ({ params }) => ({
		postsQueryOptions: stationQueryOptions.posts({
			stationId: Number(params.id),
		}),
	}),
});

function RouteComponent() {
	const router = useRouter();
	const { postsQueryOptions: queryOptions } = Route.useLoaderData();
	const { data: postsData } = useSuspenseQuery(queryOptions);

	return (
		<LayoutWithTop
			showBackButton
			onBackButtonClick={() => router.history.back()}
		>
			<Suspense fallback={<div>Loading...</div>}>
				<div className="p-4">
					<h2 className="text-lg font-semibold mb-4">게시판</h2>
					<PostList posts={postsData.posts} />
				</div>
			</Suspense>
		</LayoutWithTop>
	);
}
