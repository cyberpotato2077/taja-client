import { DEFAULT_POSITION } from "@/constants/maps";
import { parseAsFloat, parseAsInteger, useQueryStates } from "nuqs";

const mainQueryScheme = {
	latitude: parseAsFloat.withDefault(DEFAULT_POSITION.latitude),
	longitude: parseAsFloat.withDefault(DEFAULT_POSITION.longitude),
	latDelta: parseAsFloat,
	lngDelta: parseAsFloat,
	activeStationId: parseAsInteger,
};

export function useMainQueryStates() {
	return useQueryStates(mainQueryScheme, {
		history: "replace",
	});
}
