import { LayoutWithTop } from "@/components/layout-with-top";
import { PostList } from "@/components/post-list";
import { useAuth } from "@/hooks/use-auth";
import { useLoginDialog } from "@/hooks/use-login-dialog";
import { stationQueryOptions } from "@/queries/station-query-options";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PenSquare } from "lucide-react";

export const Route = createFileRoute("/station/$id/posts/")({
	component: RouteComponent,
	loader: ({ params }) => ({
		postsQueryOptions: stationQueryOptions.posts({
			stationId: Number(params.id),
		}),
		stationDetailQueryOptions: stationQueryOptions.detail({
			stationId: Number(params.id),
		}),
	}),
});

function RouteComponent() {
	const router = useRouter();
	const { id } = Route.useParams();
	const { postsQueryOptions, stationDetailQueryOptions } =
		Route.useLoaderData();
	const { data: postsData } = useSuspenseQuery(postsQueryOptions);
	const { data: stationData } = useSuspenseQuery(stationDetailQueryOptions);
	const { isLoggedIn } = useAuth();
	const { openLoginDialog } = useLoginDialog();

	const handleWritePost = () => {
		if (!isLoggedIn) {
			openLoginDialog();
			return;
		}

		router.navigate({
			to: "/station/$id/posts/new",
			params: { id },
		});
	};

	return (
		<LayoutWithTop
			title={stationData.name}
			showBackButton
			onBackButtonClick={() => {
				router.navigate({
					to: "/station/$id",
					params: { id },
					replace: true,
				});
			}}
		>
			<Suspense fallback={<div>Loading...</div>}>
				<div className="p-4">
					<div className="mb-4">
						<p className="text-sm text-gray-600 mb-3">{stationData.address}</p>
					</div>
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold">게시판</h2>
						<button
							type="button"
							onClick={handleWritePost}
							className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
						>
							<PenSquare className="w-4 h-4" />
							글쓰기
						</button>
					</div>
					<PostList posts={postsData.posts} />
				</div>
			</Suspense>
		</LayoutWithTop>
	);
}
