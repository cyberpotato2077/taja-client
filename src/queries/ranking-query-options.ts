import { queryOptions } from "@tanstack/react-query";
import { getDailyRankedPosts } from "../remotes/get-daily-ranked-posts";

export const rankingQueryOptions = {
	ranking: ["ranking"],
	daily: () => {
		return queryOptions({
			queryKey: [...rankingQueryOptions.ranking, "daily"],
			queryFn: () => getDailyRankedPosts(),
		});
	},
};
