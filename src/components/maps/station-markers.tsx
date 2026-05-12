import { useMainQueryStates } from "@/hooks/use-main-query-states";
import { useOverlay } from "@/hooks/use-overlay";
import { stationQueryOptions } from "@/queries/station-query-options";
import type {
	MapClusterResponse,
	MapStationResponse,
} from "@/remotes/get-nearby-stations";
import { useQuery } from "@tanstack/react-query";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { StationDrawer } from "./station-drawer";

const MIN_ZOOM_LEVEL = 12; // 최소 줌 레벨 (대여소 마커를 표시하기 위한)

export function StationMarkers() {
	const overlay = useOverlay();
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
				/>
			));
		}
		return () => {
			overlay.close();
		};
	}, [activeStationId, overlay, setMainQueryStates]);

	const getBikeCountColor = (count: number) => {
		if (count >= 10) return "bg-green-500 hover:bg-green-600";
		if (count >= 5) return "bg-yellow-500 hover:bg-yellow-600";
		if (count >= 1) return "bg-orange-500 hover:bg-orange-600";
		return "bg-red-500 hover:bg-red-600";
	};

	const getClusterColor = (count: number) => {
		if (count >= 100) return "bg-purple-500 hover:bg-purple-600";
		if (count >= 50) return "bg-blue-500 hover:bg-blue-600";
		if (count >= 20) return "bg-indigo-500 hover:bg-indigo-600";
		return "bg-cyan-500 hover:bg-cyan-600";
	};

	// 클러스터 마커 렌더링
	if (data?.viewType === "clusters" && data.clusters) {
		return (
			<>
				{data.clusters.map((cluster: MapClusterResponse, index: number) => (
					<AdvancedMarker
						key={`cluster-${cluster.latitude}-${cluster.longitude}-${index}`}
						position={{
							lat: cluster.latitude,
							lng: cluster.longitude,
						}}
						onClick={() => {
							map.panTo({
								lat: cluster.latitude,
								lng: cluster.longitude,
							});
							map.setZoom((map.getZoom() ?? 10) + 2);
						}}
					>
						<div
							className={`flex items-center justify-center min-w-14 h-14 px-3 rounded-full shadow-xl cursor-pointer transition-colors  ${getClusterColor(cluster.stationCount)}`}
							style={{
								transform: "translate(-50%, -50%)",
							}}
						>
							<span className="text-white font-bold text-xl">
								{cluster.stationCount}
							</span>
						</div>
					</AdvancedMarker>
				))}
			</>
		);
	}

	// 개별 대여소 마커 렌더링
	if (data?.viewType === "stations" && data.stations) {
		return (
			<>
				{data.stations.map((station: MapStationResponse) => (
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
					>
						<div
							className={`flex flex-col items-center justify-center min-w-12 h-12 px-2 rounded-full shadow-lg cursor-pointer transition-colors  ${getBikeCountColor(station.bikeCount)}`}
							style={{
								transform: "translate(-50%, -50%)",
							}}
						>
							<span className="text-white font-bold text-lg leading-tight">
								{station.bikeCount}
							</span>
						</div>
					</AdvancedMarker>
				))}
			</>
		);
	}

	return null;
}
