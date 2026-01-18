import { LayoutWithTop } from "@/components/layout-with-top";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/station/$id")({
	component: StationPage,
});

function StationPage() {
	const { id } = useParams({ from: Route.id });

	return (
		<LayoutWithTop showBackButton>
			<div className="p-4">
				<h1 className="text-xl font-bold">대여소 상세 정보</h1>
				<p>Station ID: {id}</p>
			</div>
		</LayoutWithTop>
	);
}
