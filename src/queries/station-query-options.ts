import {
	type GetNearbyStationsRequest,
	getNearbyStations,
} from "@/remotes/getNearbyStations";
import { queryOptions } from "@tanstack/react-query";

export const stationQueryOptions = {
	station: ["station"],
	markers: (params: GetNearbyStationsRequest) => {
		return queryOptions({
			queryKey: [...stationQueryOptions.station, "markers", params],
			queryFn: () => getNearbyStations(params),
		});
	},
};
