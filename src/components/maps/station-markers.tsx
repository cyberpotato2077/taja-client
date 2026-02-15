import { useMainQueryStates } from "@/hooks/use-main-query-states";
import { useOverlay } from "@/hooks/use-overlay";
import { stationQueryOptions } from "@/queries/station-query-options";
import type { MapStationResponse } from "@/remotes/get-nearby-stations";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { StationDrawer } from "./station-drawer";

export function StationMarkers() {
	const overlay = useOverlay();
	const navigate = useNavigate();
	const map = useMap();

	const [{ activeStationId, latitude, longitude, latDelta, lngDelta }, setMainQueryStates] = useMainQueryStates();

	const { data } = useQuery(
		stationQueryOptions.markers({
			latitude: latitude ?? 0,
			latDelta: latDelta ?? 0,
			longitude: longitude ?? 0,
			lngDelta: lngDelta ?? 0,
		}),
	);

	if (map == null) {
		return null;
	}

	useEffect(() => {
		if (activeStationId != null) {
			overlay.open(({ isOpen, close }) => (
				<StationDrawer
					open={isOpen}
					close={() => {
						setMainQueryStates({
							activeStationId: null,
						});
						close();
					}}
					stationId={activeStationId}
					navigate={navigate}
				/>
			));
		}
		return () => {
			overlay.close();
		};
	}, [activeStationId, overlay, navigate, setMainQueryStates]);

	return (
		<>
			{data?.map((station: MapStationResponse) => (
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
						setMainQueryStates({
							activeStationId: station.stationId,
						});
					}}
				/>
			))}
		</>
	);
}
