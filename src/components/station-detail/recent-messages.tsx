import type { RecentPostResponse } from "@/remotes/get-station";
import { MessageCircle } from "lucide-react";

interface RecentMessagesProps {
	posts: RecentPostResponse[];
	onViewMore: () => void;
}

export function RecentMessages({ posts, onViewMore }: RecentMessagesProps) {
	if (!posts || posts.length === 0) {
		return null;
	}

	return (
		<div>
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-2 mb-2">
					<MessageCircle className="w-4 h-4 text-gray-600" />
					<h3 className="text-sm font-semibold text-gray-700">최근 메시지</h3>
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
				{posts.slice(0, 3).map((message: RecentPostResponse, index: number) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index} className="bg-gray-50 rounded-lg p-2">
						<div className="flex items-start gap-2">
							<div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
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
					</div>
				))}
			</div>
		</div>
	);
}
