import { LayoutWithTop } from "@/components/layout-with-top";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMSWToggle } from "@/hooks/use-msw-toggle";
import { logout } from "@/remotes/auth";
import { getMember } from "@/remotes/get-member";
import { getAccessToken, setAccessToken } from "@/utils/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/my")({
	component: RouteComponent,
});

function RouteComponent() {
	const { isEnabled, toggleMSW } = useMSWToggle();
	const isLoggedIn = !!getAccessToken();

	return (
		<LayoutWithTop showBackButton title="My" customButton={<Button>hi</Button>}>
			<div className="p-4 space-y-4">
				<div className="flex items-center space-x-2">
					<Switch
						id="msw-toggle"
						checked={isEnabled}
						onCheckedChange={toggleMSW}
					/>
					<Label htmlFor="msw-toggle">MSW (Mock Service Worker)</Label>
				</div>

				{isLoggedIn ? <LoggedInView /> : <LoggedOutView />}
			</div>
		</LayoutWithTop>
	);
}

function LoggedInView() {
	const queryClient = useQueryClient();

	const { data: memberData, isLoading } = useQuery({
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

	if (isLoading) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-600">로딩 중...</p>
			</div>
		);
	}

	if (!memberData) {
		return null;
	}

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
		</div>
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
