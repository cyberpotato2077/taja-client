import { StationDrawer } from "@/components/maps/station-drawer";
import { useOverlay } from "@/hooks/use-overlay";

import {
	APIProvider,
	AdvancedMarker,
	Map as GoogleMap,
} from "@vis.gl/react-google-maps";

export function StationMap() {
	const overlay = useOverlay();

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
	const position = { lat: 37.498132408887, lng: 127.02839523744 };

	if (apiKey == null) {
		return (
			<div className="w-full h-full flex items-center justify-center min-h-[100vh] bg-gradient-to-b from-gray-300 via-gray-100 via-70% to-white">
				apiKey를 찾지 못했습니다.
			</div>
		);
	}

	return (
		<APIProvider apiKey={apiKey}>
			<GoogleMap
				className="fixed top-0 max-w-screen-sm w-full h-[100vh]"
				defaultCenter={position}
				defaultZoom={15}
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
