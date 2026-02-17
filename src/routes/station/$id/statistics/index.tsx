import { LayoutWithTop } from "@/components/layout-with-top";
import { StationStatistics } from "@/components/station-statistics";
import { stationQueryOptions } from "@/queries/station-query-options";
import { Suspense } from "@suspensive/react";
import { SuspenseQuery } from "@suspensive/react-query-5";
import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/station/$id/statistics/")({
	component: StatisticsPage,
});

function StatisticsPage() {
	const { id } = useParams({ from: Route.id });
	const router = useRouter();

	return (
		<LayoutWithTop
			showBackButton
			onBackButtonClick={() => {
				router.history.back();
			}}
		>
			<Suspense fallback>
				<SuspenseQuery
					{...stationQueryOptions.detail({ stationId: Number(id) })}
				>
					{({ data: station }) => <StationStatistics station={station} />}
				</SuspenseQuery>
			</Suspense>
		</LayoutWithTop>
	);
}
