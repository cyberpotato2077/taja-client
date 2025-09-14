export function getScreen({
	centerPosition,
	swPosition,
	nePosition,
}: {
	centerPosition: { lat: number; lng: number };
	swPosition: { lat: number; lng: number };
	nePosition: { lat: number; lng: number };
}) {
	return {
		latitude: centerPosition.lat,
		longitude: centerPosition.lng,
		latDelta: Number(
			(Math.abs(nePosition.lat - swPosition.lat) / 2).toFixed(6),
		),
		lngDelta: Number(
			(Math.abs(nePosition.lng - swPosition.lng) / 2).toFixed(6),
		),
	};
}
