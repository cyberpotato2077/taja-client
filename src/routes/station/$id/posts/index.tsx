import { LayoutWithTop } from "@/components/layout-with-top";
import { PostList } from "@/components/post-list";
import { stationQueryOptions } from "@/queries/station-query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/station/$id/posts/")({
	component: RouteComponent,
	loader: ({ params }) => ({
		stationQueryOptions: stationQueryOptions.detail({
			stationId: Number(params.id),
		}),
	}),
});

function RouteComponent() {
	const router = useRouter();
	const { stationQueryOptions: queryOptions } = Route.useLoaderData();
	const { data: station } = useSuspenseQuery(queryOptions);

	return (
		<LayoutWithTop
			showBackButton
			onBackButtonClick={() => router.history.back()}
		>
			<div className="p-4">
				<h2 className="text-lg font-semibold mb-4">최근 메시지</h2>
				<PostList posts={station.recentPosts} />
			</div>
		</LayoutWithTop>
	);
}
