import { LayoutWithTop } from "@/components/layout-with-top";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/statistics")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<LayoutWithTop showBackButton>
			{Array.from({ length: 50 }, (_, i) => (
				<div
					key={`row-${
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						i
					}`}
				>
					{i}
				</div>
			))}
		</LayoutWithTop>
	);
}
