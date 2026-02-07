import { LayoutWithTop } from "@/components/layout-with-top";
import { StationDetail } from "@/components/station-detail";
import { stationQueryOptions } from "@/queries/station-query-options";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/station/$id")({
	component: StationPage,
});

function StationPage() {
	const { id } = useParams({ from: Route.id });
	const router = useRouter();

	const {
		data: station,
		isPending,
		isError,
	} = useQuery(stationQueryOptions.detail({ stationId: Number(id) }));

	if (isPending || isError) {
		return null;
	}

	return (
		<LayoutWithTop
			showBackButton
			onBackButtonClick={() => {
				router.history.back();
			}}
		>
			<StationDetail station={station} />
		</LayoutWithTop>
	);
}
