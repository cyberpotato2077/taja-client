import { LayoutWithTop } from "@/components/layout-with-top";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/remotes/auth";
import { setAccessToken } from "@/utils/http";
import { getMSWState } from "@/utils/msw-toggle";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const isMSWEnabled = getMSWState();

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			setAccessToken(data.accessToken);
			router.navigate({ to: "/my" });
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		loginMutation.mutate(formData);
	};

	const handleInputChange =
		(field: keyof typeof formData) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({ ...prev, [field]: e.target.value }));
		};

	const handleMSWLogin = () => {
		loginMutation.mutate({
			email: "test@example.com",
			password: "password",
		});
	};

	return (
		<LayoutWithTop
			showBackButton
			title="로그인"
			onBackButtonClick={() => router.navigate({ to: "/my" })}
		>
			<div className="p-4 space-y-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">이메일</Label>
						<Input
							id="email"
							type="email"
							value={formData.email}
							onChange={handleInputChange("email")}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">비밀번호</Label>
						<Input
							id="password"
							type="password"
							value={formData.password}
							onChange={handleInputChange("password")}
							required
						/>
					</div>

					{loginMutation.isError && (
						<p className="text-sm text-red-500">
							이메일 또는 비밀번호가 올바르지 않습니다.
						</p>
					)}

					<Button
						type="submit"
						className="w-full"
						disabled={loginMutation.isPending}
					>
						{loginMutation.isPending ? "로그인 중..." : "로그인"}
					</Button>
				</form>

				{import.meta.env.DEV && isMSWEnabled && (
					<div className="space-y-2">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									개발 모드
								</span>
							</div>
						</div>
						<Button
							variant="secondary"
							className="w-full"
							onClick={handleMSWLogin}
							disabled={loginMutation.isPending}
						>
							MSW 자동 로그인
						</Button>
					</div>
				)}

				<div className="space-y-2">
					<div className="text-center text-sm text-gray-600">
						계정이 없으신가요?
					</div>
					<Button
						variant="outline"
						className="w-full"
						onClick={() => router.navigate({ to: "/signup" })}
					>
						회원가입
					</Button>
				</div>
			</div>
		</LayoutWithTop>
	);
}
