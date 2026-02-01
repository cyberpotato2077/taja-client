import { getFavoriteStations } from "@/remotes/get-favorite-stations";
import {
	type GetNearbyStationsRequest,
	getNearbyStations,
} from "@/remotes/get-nearby-stations";
import { type GetStationRequest, getStation } from "@/remotes/get-station";
import {
	type SearchStationsRequest,
	searchStations,
} from "@/remotes/search-stations";
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
	search: (params: SearchStationsRequest) => {
		return queryOptions({
			queryKey: [...stationQueryOptions.station, "search", params],
			queryFn: () => searchStations(params),
		});
	},
	favorites: () => {
		return queryOptions({
			queryKey: [...stationQueryOptions.station, "favorites"],
			queryFn: () => getFavoriteStations(),
		});
	},
};
