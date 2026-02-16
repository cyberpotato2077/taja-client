import { LayoutWithTop } from "@/components/layout-with-top";
import { createPost } from "@/remotes/create-post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/station/$id/posts/new/")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const { id } = Route.useParams();
	const stationId = Number(id);
	const queryClient = useQueryClient();

	const [content, setContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const createPostMutation = useMutation({
		mutationFn: (content: string) => createPost(stationId, { content }),
		onSuccess: () => {
			// 게시글 목록 쿼리 무효화하여 새로고침
			queryClient.invalidateQueries({
				queryKey: ["station", "posts", { stationId }],
			});
			// 게시판 목록으로 돌아가기
			router.navigate({
				to: "/station/$id/posts",
				params: { id },
			});
		},
		onError: (error) => {
			console.error("Failed to create post:", error);
			alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
			setIsSubmitting(false);
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!content.trim()) {
			alert("내용을 입력해주세요.");
			return;
		}

		if (content.length > 500) {
			alert("500자 이내로 작성해주세요.");
			return;
		}

		setIsSubmitting(true);
		createPostMutation.mutate(content);
	};

	const handleCancel = () => {
		if (content.trim() && !confirm("작성 중인 내용이 있습니다. 정말 나가시겠습니까?")) {
			return;
		}
		router.history.back();
	};

	return (
		<LayoutWithTop
			showBackButton
			onBackButtonClick={handleCancel}
		>
			<div className="p-4">
				<h2 className="text-lg font-semibold mb-4">게시글 작성</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="content" className="sr-only">
							내용
						</label>
						<textarea
							id="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="이 대여소에 대한 의견을 남겨주세요..."
							className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
							maxLength={500}
							disabled={isSubmitting}
						/>
						<div className="flex justify-between items-center mt-2">
							<span className="text-xs text-gray-500">
								{content.length} / 500자
							</span>
						</div>
					</div>

					<div className="flex gap-2">
						<button
							type="button"
							onClick={handleCancel}
							className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50"
							disabled={isSubmitting}
						>
							취소
						</button>
						<button
							type="submit"
							className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
							disabled={isSubmitting || !content.trim()}
						>
							{isSubmitting ? "작성 중..." : "작성 완료"}
						</button>
					</div>
				</form>
			</div>
		</LayoutWithTop>
	);
}
