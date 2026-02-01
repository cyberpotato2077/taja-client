import { LayoutWithTop } from "@/components/layout-with-top";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		name: "",
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// TODO: Implement signup logic
		console.log("Signup data:", formData);
		// Redirect to my page after successful signup
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
			title="회원가입"
			onBackButtonClick={() => router.navigate({ to: "/my" })}
		>
			<div className="p-4 space-y-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">이름</Label>
						<Input
							id="name"
							type="text"
							value={formData.name}
							onChange={handleInputChange("name")}
							required
						/>
					</div>

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

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">비밀번호 확인</Label>
						<Input
							id="confirmPassword"
							type="password"
							value={formData.confirmPassword}
							onChange={handleInputChange("confirmPassword")}
							required
						/>
					</div>

					<Button type="submit" className="w-full">
						회원가입
					</Button>
				</form>
			</div>
		</LayoutWithTop>
	);
}
