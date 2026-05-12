import { MAP_ID, MAP_RESTRICTION } from "@/constants/maps";
import { useMainQueryStates } from "@/hooks/use-main-query-states";
import { getScreen } from "@/utils/maps";
import {
	// AdvancedMarker,
	Map as GoogleMap,
} from "@vis.gl/react-google-maps";
import { CurrentPositionMarker } from "./current-position-marker";
import { StationMarkers } from "./station-markers";

export function StationMap() {
	const [coordinates, setCoordinates] = useMainQueryStates();
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
			gestureHandling="greedy"
			renderingType="VECTOR"
			restriction={{
				latLngBounds: MAP_RESTRICTION,
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
			<CurrentPositionMarker />
		</GoogleMap>
	);
}
