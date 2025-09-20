import { getNearbyStations } from "@/remotes/getNearbyStations";
import { useQuery } from "@tanstack/react-query";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

export function StationMarkers() {
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

	console.log(data);

	return (
		<>
			{data?.map((station) => (
				<AdvancedMarker
					key={`${station.latitude}-${station.longitude}`}
					position={{
						lat: station.latitude,
						lng: station.longitude,
					}}
					onClick={() => console.log(station)}
				/>
			))}
		</>
	);
}
