import { LayoutWithTop } from "@/components/layout-with-top";
import { StationDetail } from "@/components/station-detail";
import { stationQueryOptions } from "@/queries/station-query-options";
import { Suspense } from "@suspensive/react";
import { SuspenseQuery } from "@suspensive/react-query-5";
import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/station/$id/")({
	component: StationPage,
});

function StationPage() {
	const { id } = useParams({ from: Route.id });
	const router = useRouter();

	return (
		<LayoutWithTop
			showBackButton
			onBackButtonClick={() => {
				router.history.back();
			}}
		>
			<Suspense
				fallback={
					<div className="flex justify-center items-center h-[100vh] w-full">
						Loading...
					</div>
				}
			>
				<SuspenseQuery
					{...stationQueryOptions.detail({ stationId: Number(id) })}
				>
					{({ data: station }) => <StationDetail station={station} />}
				</SuspenseQuery>
			</Suspense>
		</LayoutWithTop>
	);
}
