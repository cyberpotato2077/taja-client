import {
	type GetNearbyStationsRequest,
	getNearbyStations,
} from "@/remotes/get-nearby-stations";
import { getStation, type GetStationRequest } from "@/remotes/get-station";
import { queryOptions } from "@tanstack/react-query";

export const stationQueryOptions = {
	station: ["station"],
	markers: (params: GetNearbyStationsRequest) => {
		return queryOptions({
			queryKey: [...stationQueryOptions.station, "markers", params],
			queryFn: () => getNearbyStations(params),
		});
	},
	detail: (params: GetStationRequest) => {
		return queryOptions({
			queryKey: [...stationQueryOptions.station, "detail", params.id],
			queryFn: () => getStation(params),
		});
	},
};
