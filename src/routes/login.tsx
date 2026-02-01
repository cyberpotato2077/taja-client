import { LayoutWithTop } from "@/components/layout-with-top";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// TODO: Implement login logic
		console.log("Login data:", formData);
		// Redirect to my page after successful login
		router.navigate({ to: "/my" });
	};

	const handleInputChange =
		(field: keyof typeof formData) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({ ...prev, [field]: e.target.value }));
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

					<Button type="submit" className="w-full">
						로그인
					</Button>
				</form>

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
