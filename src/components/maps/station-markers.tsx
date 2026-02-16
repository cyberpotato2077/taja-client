import { useMainQueryStates } from "@/hooks/use-main-query-states";
import { useOverlay } from "@/hooks/use-overlay";
import { stationQueryOptions } from "@/queries/station-query-options";
import type { MapStationResponse } from "@/remotes/get-nearby-stations";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { StationDrawer } from "./station-drawer";

const MIN_ZOOM_LEVEL = 12; // 최소 줌 레벨 (충전소 마커를 표시하기 위한)

export function StationMarkers() {
	const overlay = useOverlay();
	const navigate = useNavigate();
	const map = useMap();
	const [zoom, setZoom] = useState<number | undefined>(undefined);

	const [
		{ activeStationId, latitude, longitude, latDelta, lngDelta },
		setMainQueryStates,
	] = useMainQueryStates();

	// 지도 줌 레벨 변경 감지
	useEffect(() => {
		if (map == null) return;

		const updateZoom = () => {
			setZoom(map.getZoom());
		};

		// 초기 줌 레벨 설정
		updateZoom();

		// 줌 변경 이벤트 리스너 등록
		const listener = map.addListener("zoom_changed", updateZoom);

		return () => {
			listener.remove();
		};
	}, [map]);

	const { data } = useQuery({
		...stationQueryOptions.markers({
			latitude: latitude ?? 0,
			latDelta: latDelta ?? 0,
			longitude: longitude ?? 0,
			lngDelta: lngDelta ?? 0,
		}),
		enabled: zoom != null && zoom >= MIN_ZOOM_LEVEL,
	});

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
