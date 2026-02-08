import { LayoutWithTop } from "@/components/layout-with-top";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/station/$id/posts/")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();

	return (
		<LayoutWithTop
			showBackButton
			onBackButtonClick={() => router.history.back()}
		>
			<div>Hello "/station/$id/posts"!</div>
		</LayoutWithTop>
	);
}
