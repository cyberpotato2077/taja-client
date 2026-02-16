import { findFavoriteStations } from "@/remotes/get-favorite-stations";
import {
	type NearbyStationRequest,
	findNearbyStations,
} from "@/remotes/get-nearby-stations";
import { getPostDetail } from "@/remotes/get-post-detail";
import { type GetPostsRequest, getPosts } from "@/remotes/get-posts";
import { type GetStationRequest, getStation } from "@/remotes/get-station";
import { isFavoriteStation } from "@/remotes/is-favorite-station";
import {
	type SearchStationRequest,
	searchStation,
} from "@/remotes/search-stations";
import { queryOptions } from "@tanstack/react-query";

export const stationQueryOptions = {
	station: ["station"],
	markers: (params: NearbyStationRequest) => {
		return queryOptions({
			queryKey: [...stationQueryOptions.station, "markers", params],
			queryFn: () => findNearbyStations(params),
		});
	},
	detail: (params: GetStationRequest) => {
		return queryOptions({
			queryKey: [...stationQueryOptions.station, "detail", params.stationId],
			queryFn: () => getStation(params),
		});
	},
	search: (params: SearchStationRequest) => {
		return queryOptions({
			queryKey: [...stationQueryOptions.station, "search", params],
			queryFn: () => searchStation(params),
		});
	},
	favorites: () => {
		return queryOptions({
			queryKey: [...stationQueryOptions.station, "favorites"],
			queryFn: () => findFavoriteStations(),
		});
	},
	isFavorite: (stationId: number) => {
		return queryOptions({
			queryKey: [...stationQueryOptions.station, "isFavorite", stationId],
			queryFn: () => isFavoriteStation(stationId),
		});
	},
	posts: (params: GetPostsRequest) => {
		return queryOptions({
			queryKey: [...stationQueryOptions.station, "posts", params],
			queryFn: () => getPosts(params),
		});
	},
	postDetail: (postId: number) => {
		return queryOptions({
			queryKey: [...stationQueryOptions.station, "postDetail", postId],
			queryFn: () => getPostDetail(postId),
		});
	},
};
