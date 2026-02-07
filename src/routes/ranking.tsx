import { LayoutWithTop } from "@/components/layout-with-top";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ranking")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<LayoutWithTop showBackButton>
			{/* 추후에 랭킹 내용을 추가할 예정 */}
		</LayoutWithTop>
	);
}
