import { StationDrawer } from "@/components/maps/station-drawer";
import { DEFAULT_POSITION } from "@/constants/maps";
import { useOverlay } from "@/hooks/use-overlay";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
export function CurrentPositionMarker() {
	const overlay = useOverlay();
	return (
		<AdvancedMarker
			position={{
				lat: DEFAULT_POSITION.latitude,
				lng: DEFAULT_POSITION.longitude,
			}}
			onClick={() =>
				overlay.open(({ isOpen, close }) => (
					<StationDrawer open={isOpen} close={close} />
				))
			}
		>
			<Pin
				background={"#0f9d58"}
				borderColor={"#006425"}
				glyphColor={"#60d98f"}
			/>
		</AdvancedMarker>
	);
}
