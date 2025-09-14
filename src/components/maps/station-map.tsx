// import { StationDrawer } from "@/components/maps/station-drawer";
// import { useOverlay } from "@/hooks/use-overlay";
import { parseAsFloat, useQueryStates } from "nuqs";

import { MAP_ID } from "@/constants/maps";
import { getScreen } from "@/utils/maps";
import {
	// AdvancedMarker,
	Map as GoogleMap,
} from "@vis.gl/react-google-maps";
import { StationMarkers } from "./station-markers";

export function StationMap() {
	// const overlay = useOverlay();

	const [coordinates, setCoordinates] = useQueryStates(
		{
			latitude: parseAsFloat.withDefault(37.498132408887),
			longitude: parseAsFloat.withDefault(127.02839523744),
			latDelta: parseAsFloat,
			lngDelta: parseAsFloat,
		},
		{
			history: "replace",
		},
	);

	return (
		<GoogleMap
			className="fixed top-0 max-w-screen-sm w-full h-[100vh]"
			defaultCenter={{
				lat: coordinates.latitude,
				lng: coordinates.longitude,
			}}
			defaultZoom={15}
			minZoom={10}
			maxZoom={16}
			mapId={MAP_ID}
			disableDefaultUI={true}
			renderingType="VECTOR"
			restriction={{
				latLngBounds: {
					north: 43,
					south: 33,
					west: 125,
					east: 132,
				},
			}}
			onIdle={(event) => {
				const center = event.map.getCenter();
				const ne = event.map.getBounds()?.getNorthEast();
				const sw = event.map.getBounds()?.getSouthWest();
				if (center == null || ne == null || sw == null) {
					return;
				}
				const { latitude, longitude, latDelta, lngDelta } = getScreen({
					centerPosition: {
						lat: center.lat(),
						lng: center.lng(),
					},
					nePosition: {
						lat: ne.lat(),
						lng: ne.lng(),
					},
					swPosition: {
						lat: sw.lat(),
						lng: sw.lng(),
					},
				});
				setCoordinates({
					latitude,
					longitude,
					latDelta,
					lngDelta,
				});
			}}
		>
			<StationMarkers />
			{/* <AdvancedMarker
					position={position}
					onClick={() =>
						overlay.open(({ isOpen, close }) => (
							<StationDrawer open={isOpen} close={close} />
						))
					}
				/> */}
		</GoogleMap>
	);
}
