import { LayoutWithTop } from "@/components/layout-with-top";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMSWToggle } from "@/hooks/use-msw-toggle";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/my")({
	component: RouteComponent,
});

function RouteComponent() {
	const { isEnabled, toggleMSW } = useMSWToggle();

	return (
		<LayoutWithTop showBackButton title="My" customButton={<Button>hi</Button>}>
			<div className="p-4 space-y-4">
				<div className="flex items-center space-x-2">
					<Switch
						id="msw-toggle"
						checked={isEnabled}
						onCheckedChange={toggleMSW}
					/>
					<Label htmlFor="msw-toggle">MSW (Mock Service Worker)</Label>
				</div>
			</div>
		</LayoutWithTop>
	);
}
