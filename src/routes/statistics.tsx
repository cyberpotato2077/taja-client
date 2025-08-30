import { LayoutWithTop } from "@/components/layout-with-top";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/statistics")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		// <div>
		// 	<Top showBackButton />
		// 	<div className="bg-white h-[100vh]">Hello "/statistics"!</div>
		// </div>
		<LayoutWithTop showBackButton />
	);
}
