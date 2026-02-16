import type { RecentPostResponse } from "@/remotes/get-station";
import { useRouter } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

interface RecentMessagesProps {
	stationId: number;
	posts: RecentPostResponse[];
	onViewMore: () => void;
}

export function RecentMessages({
	stationId,
	posts,
	onViewMore,
}: RecentMessagesProps) {
	const router = useRouter();

	if (!posts || posts.length === 0) {
		return null;
	}

	const handlePostClick = (postId: number) => {
		router.navigate({
			to: "/station/$id/posts/$postId",
			params: {
				id: String(stationId),
				postId: String(postId),
			},
		});
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-2 mb-2">
					<MessageCircle className="w-4 h-4 text-gray-600" />
					<h3 className="text-sm font-semibold text-gray-700">게시판</h3>
					<span className="text-xs text-gray-500">({posts.length})</span>
				</div>
				<div>
					<button
						type="button"
						className="text-xs text-blue-600"
						onClick={onViewMore}
					>
						더보기
					</button>
				</div>
			</div>
			<div className="space-y-2">
				{posts.slice(0, 3).map((message: RecentPostResponse) => (
					<button
						key={message.postId}
						type="button"
						className="w-full bg-gray-50 hover:bg-gray-100 rounded-lg p-2 transition-colors text-left"
						onClick={() => handlePostClick(message.postId)}
					>
						<div className="flex items-start gap-2">
							<div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0">
								{message.writer?.[0]?.toUpperCase() || "U"}
							</div>
							<div className="flex-1 min-w-0">
								<div className="text-xs font-medium text-gray-700">
									{message.writer}
								</div>
								<div className="text-xs text-gray-600 truncate">
									{message.message}
								</div>
							</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
}
