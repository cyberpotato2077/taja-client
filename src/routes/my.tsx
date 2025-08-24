import { Top } from "@/components/top";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/my")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Top showBackButton title="My" customButton={<Button>hi</Button>} />
			Hello "/my"!
		</div>
	);
}
