import { TanstackDevtools } from "@tanstack/react-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import { BottomNavigation } from "@/components/bottom-navigation";
import { StationMap } from "@/components/maps/station-map";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => {
		return (
			<>
				<div className="min-h-screen bg-gray-100">
					<div className="max-w-screen-sm mx-auto">
						<Outlet />
						<StationMap />
						<BottomNavigation />
					</div>
				</div>
				<TanstackDevtools
					config={{
						position: "bottom-left",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
			</>
		);
	},
});
