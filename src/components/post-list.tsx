import type { RecentPostResponse } from "@/remotes/get-station";

interface PostListProps {
	posts: RecentPostResponse[];
}

export function PostList({ posts }: PostListProps) {
	if (posts.length === 0) {
		return (
			<p className="text-gray-500 text-center py-8">아직 메시지가 없습니다.</p>
		);
	}

	return (
		<div className="space-y-3">
			{posts.map((post) => (
				<div
					key={`${post.writer}-${post.message}`}
					className="bg-gray-50 rounded-lg p-3"
				>
					<div className="flex items-start gap-3">
						<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
							<span className="text-xs text-blue-600 font-medium">
								{post.writer.charAt(0)}
							</span>
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-gray-900 mb-1">
								{post.writer}
							</div>
							<div className="text-sm text-gray-700">{post.message}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
