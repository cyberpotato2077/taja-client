import { Top } from "@/components/top";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/statistics")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Top showBackButton />
			Hello "/statistics"!
		</div>
	);
}
