import { LayoutWithTop } from "@/components/layout-with-top";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/my")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<LayoutWithTop
			showBackButton
			title="My"
			customButton={<Button>hi</Button>}
		/>
	);
}
