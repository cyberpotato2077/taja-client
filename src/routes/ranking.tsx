import { LayoutWithTop } from "@/components/layout-with-top";
import { rankingQueryOptions } from "@/queries/ranking-query-options";
import type { Item } from "@/remotes/get-daily-ranked-posts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Heart, MapPin, MessageCircle, Trophy } from "lucide-react";

export const Route = createFileRoute("/ranking")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: dailyRankedPosts } = useSuspenseQuery(
		rankingQueryOptions.daily(),
	);

	return (
		<LayoutWithTop showBackButton>
			<div className="container mx-auto px-4 py-6 max-w-2xl">
				<div className="flex items-center gap-2 mb-6">
					<Trophy className="w-6 h-6 text-yellow-500" />
					<h1 className="text-2xl font-bold">일간 랭킹</h1>
				</div>

				<div className="space-y-4">
					{dailyRankedPosts.posts.map((post: Item) => (
						<RankingCard key={post.postId} post={post} />
					))}
				</div>
			</div>
		</LayoutWithTop>
	);
}

interface RankingCardProps {
	post: Item;
}

function RankingCard({ post }: RankingCardProps) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate({
			to: "/station/$id/posts",
			params: { id: post.stationId.toString() },
		});
	};
	const getRankColor = (rank: number) => {
		switch (rank) {
			case 1:
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case 2:
				return "bg-gray-100 text-gray-800 border-gray-200";
			case 3:
				return "bg-orange-100 text-orange-800 border-orange-200";
			default:
				return "bg-blue-50 text-blue-700 border-blue-200";
		}
	};

	const getRankIcon = (rank: number) => {
		switch (rank) {
			case 1:
				return "🥇";
			case 2:
				return "🥈";
			case 3:
				return "🥉";
			default:
				return rank.toString();
		}
	};

	return (
		<button
			type="button"
			className="w-full bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow text-left"
			onClick={handleClick}
		>
			<div className="flex items-start gap-3">
				<div
					className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border ${getRankColor(post.rank)}`}
				>
					{getRankIcon(post.rank)}
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-2">
						<span className="font-semibold text-sm">{post.writer}</span>
						<div className="flex items-center gap-1 text-xs text-gray-500">
							<MapPin className="w-3 h-3" />
							{post.stationName}
						</div>
						<span className="text-xs text-gray-400">
							{new Date(post.createdAt).toLocaleDateString()}
						</span>
					</div>

					<p className="text-sm text-gray-700 mb-3 line-clamp-2">
						{post.content}
					</p>

					<div className="flex items-center gap-4 text-xs text-gray-500">
						<div className="flex items-center gap-1">
							<Heart
								className={`w-4 h-4 ${post.liked ? "fill-red-500 text-red-500" : ""}`}
							/>
							{post.likeCount}
						</div>
						<div className="flex items-center gap-1">
							<MessageCircle className="w-4 h-4" />
							{post.commentCount}
						</div>
					</div>
				</div>
			</div>
		</button>
	);
}
