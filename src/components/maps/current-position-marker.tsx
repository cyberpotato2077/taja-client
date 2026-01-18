import { DEFAULT_POSITION } from "@/constants/maps";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
export function CurrentPositionMarker() {
	return (
		<AdvancedMarker
			position={{
				lat: DEFAULT_POSITION.latitude,
				lng: DEFAULT_POSITION.longitude,
			}}
		>
			<Pin
				background={"#0f9d58"}
				borderColor={"#006425"}
				glyphColor={"#60d98f"}
			/>
		</AdvancedMarker>
	);
}
