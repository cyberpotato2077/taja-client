import { useOverlay } from "@/hooks/use-overlay";
import { getNearbyStations } from "@/remotes/getNearbyStations";
import { useQuery } from "@tanstack/react-query";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { StationDrawer } from "./station-drawer";

export function StationMarkers() {
	const overlay = useOverlay();
	const map = useMap();

	const { data } = useQuery({
		queryKey: ["stations"],
		queryFn: () =>
			getNearbyStations({
				latitude: 0,
				latitudeDelta: 0,
				longitude: 0,
				longitudeDelta: 0,
			}),
	});

	if (map == null) {
		return null;
	}

	return (
		<>
			{data?.map((station) => (
				<AdvancedMarker
					key={`${station.latitude}-${station.longitude}`}
					position={{
						lat: station.latitude,
						lng: station.longitude,
					}}
					onClick={() => {
						map.panTo({
							lat: station.latitude,
							lng: station.longitude,
						});
						overlay.open(({ isOpen, close }) => (
							<StationDrawer open={isOpen} close={close} />
						));
					}}
				/>
			))}
		</>
	);
}
