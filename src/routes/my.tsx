import { LayoutWithTop } from "@/components/layout-with-top";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";
import { useMSWToggle } from "@/hooks/use-msw-toggle";
import { useOverlay } from "@/hooks/use-overlay";
import { logout } from "@/remotes/auth";
import { deleteMember } from "@/remotes/delete-member";
import { getMember } from "@/remotes/get-member";
import { setAccessToken } from "@/utils/http";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Suspense, useState } from "react";

export const Route = createFileRoute("/my")({
	component: RouteComponent,
});

function RouteComponent() {
	const { isEnabled, toggleMSW } = useMSWToggle();
	const { isLoggedIn } = useAuth();

	return (
		<LayoutWithTop showBackButton title="My">
			<div className="p-4 space-y-4">
				{import.meta.env.DEV && (
					<div className="flex items-center space-x-2">
						<Switch
							id="msw-toggle"
							checked={isEnabled}
							onCheckedChange={toggleMSW}
						/>
						<Label htmlFor="msw-toggle">MSW (Mock Service Worker)</Label>
					</div>
				)}

				{isLoggedIn ? (
					<Suspense
						fallback={
							<div className="text-center py-8">
								<p className="text-gray-600">로딩 중...</p>
							</div>
						}
					>
						<LoggedInView />
					</Suspense>
				) : (
					<LoggedOutView />
				)}
			</div>
		</LayoutWithTop>
	);
}

function LoggedInView() {
	const queryClient = useQueryClient();

	const { data: memberData } = useSuspenseQuery({
		queryKey: ["member"],
		queryFn: getMember,
		retry: false,
	});

	const logoutMutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			setAccessToken(null);
			queryClient.clear();
			window.location.reload();
		},
	});

	const handleLogout = () => {
		logoutMutation.mutate();
	};

	return (
		<div className="space-y-4">
			<div className="bg-gray-50 rounded-lg p-6 text-center">
				<h2 className="text-2xl font-bold mb-2">
					환영합니다, {memberData.name}님!
				</h2>
				<p className="text-gray-600">{memberData.email}</p>
			</div>

			<Button
				onClick={handleLogout}
				variant="outline"
				className="w-full"
				disabled={logoutMutation.isPending}
			>
				{logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
			</Button>

			<DeleteMemberButton />
		</div>
	);
}

function DeleteMemberButton() {
	const queryClient = useQueryClient();
	const overlay = useOverlay();

	const handleClick = () => {
		overlay.open(({ isOpen, close }) => {
			const [password, setPassword] = useState("");
			const [errorMessage, setErrorMessage] = useState("");

			const deleteMemberMutation = useMutation({
				mutationFn: deleteMember,
				onSuccess: () => {
					// 탈퇴 성공 후 로그아웃
					setAccessToken(null);
					queryClient.clear();
					close();
					window.location.reload();
				},
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				onError: (error: any) => {
					// 에러 처리
					if (error.response?.data?.message) {
						setErrorMessage(error.response.data.message);
					} else {
						setErrorMessage("회원 탈퇴에 실패했습니다.");
					}
				},
			});

			const handleDeleteMember = () => {
				setErrorMessage("");
				deleteMemberMutation.mutate({ password });
			};

			const handleDialogClose = () => {
				setPassword("");
				setErrorMessage("");
				close();
			};

			return (
				<Dialog open={isOpen} onOpenChange={handleDialogClose}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>회원 탈퇴</DialogTitle>
							<DialogDescription>
								회원 탈퇴를 진행하시려면 비밀번호를 입력해주세요.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="password">비밀번호</Label>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="비밀번호를 입력하세요"
									disabled={deleteMemberMutation.isPending}
								/>
							</div>
							{errorMessage && (
								<p className="text-sm text-red-600">{errorMessage}</p>
							)}
						</div>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={handleDialogClose}
								disabled={deleteMemberMutation.isPending}
							>
								취소
							</Button>
							<Button
								variant="destructive"
								onClick={handleDeleteMember}
								disabled={deleteMemberMutation.isPending || !password}
							>
								{deleteMemberMutation.isPending ? "탈퇴 중..." : "탈퇴하기"}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			);
		});
	};

	return (
		<Button onClick={handleClick} variant="destructive" className="w-full">
			회원 탈퇴
		</Button>
	);
}

function LoggedOutView() {
	const router = useRouter();

	const handleSignupClick = () => {
		router.navigate({ to: "/signup" });
	};

	return (
		<>
			<Button onClick={handleSignupClick} className="w-full">
				회원가입
			</Button>

			<Button
				onClick={() => router.navigate({ to: "/login" })}
				variant="outline"
				className="w-full"
			>
				로그인
			</Button>
		</>
	);
}
