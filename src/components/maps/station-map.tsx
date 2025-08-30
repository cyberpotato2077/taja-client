import { StationDrawer } from "@/components/maps/station-drawer";
import { useOverlay } from "@/hooks/use-overlay";

import {
	APIProvider,
	AdvancedMarker,
	Map as GoogleMap,
} from "@vis.gl/react-google-maps";

export function StationMap() {
	const overlay = useOverlay();
	const position = { lat: 53.54992, lng: 10.00678 };
	return (
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
	);
}
