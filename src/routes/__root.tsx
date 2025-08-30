import { TanstackDevtools } from "@tanstack/react-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import { BottomNavigation } from "@/components/bottom-navigation";
import { StationDrawer } from "@/components/maps/station-drawer";
import { useOverlay } from "@/hooks/use-overlay";
import type { QueryClient } from "@tanstack/react-query";
import {
	APIProvider,
	AdvancedMarker,
	Map as GoogleMap,
} from "@vis.gl/react-google-maps";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => {
		const overlay = useOverlay();
		const position = { lat: 53.54992, lng: 10.00678 };

		return (
			<>
				<div className="min-h-screen bg-gray-100">
					<div className="max-w-screen-sm mx-auto">
						<Outlet />

						<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
							<GoogleMap
								style={{ width: "100%", height: "100vh" }}
								defaultCenter={position}
								defaultZoom={10}
								mapId="DEMO_MAP_ID"
								disableDefaultUI={true}
								renderingType="VECTOR"
							>
								<AdvancedMarker
									position={position}
									onClick={() =>
										overlay.open(({ isOpen, close }) => (
											<StationDrawer open={isOpen} close={close} />
										))
									}
								/>
							</GoogleMap>
						</APIProvider>
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
