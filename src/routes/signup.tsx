import { LayoutWithTop } from "@/components/layout-with-top";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	checkNameDuplicate,
	sendEmail,
	signup,
	verifyEmail,
} from "@/remotes/auth";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export const Route = createFileRoute("/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		verificationCode: "",
	});
	const [isNameChecked, setIsNameChecked] = useState(false);
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const [isCodeSent, setIsCodeSent] = useState(false);
	const [isSignupSuccess, setIsSignupSuccess] = useState(false);

	const nameCheckMutation = useMutation({
		mutationFn: checkNameDuplicate,
		onSuccess: (data) => {
			if (!data.isDuplicate) {
				setIsNameChecked(true);
			}
		},
	});

	const sendEmailMutation = useMutation({
		mutationFn: sendEmail,
		onSuccess: () => {
			setIsCodeSent(true);
		},
	});

	const verifyEmailMutation = useMutation({
		mutationFn: verifyEmail,
		onSuccess: () => {
			setIsEmailVerified(true);
		},
	});

	const signupMutation = useMutation({
		mutationFn: signup,
		onSuccess: () => {
			setIsSignupSuccess(true);
			// 콘페티 효과
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		},
	});

	// 회원가입 성공 시 3초 후 /my로 이동
	useEffect(() => {
		if (isSignupSuccess) {
			const timer = setTimeout(() => {
				router.navigate({ to: "/my" });
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isSignupSuccess, router]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!canSubmit) return;
		signupMutation.mutate({
			name: formData.name,
			email: formData.email,
			password: formData.password,
		});
	};

	const handleInputChange =
		(field: keyof typeof formData) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({ ...prev, [field]: e.target.value }));
			if (field === "name") {
				setIsNameChecked(false);
				nameCheckMutation.reset();
			}
			if (field === "email") {
				setIsEmailVerified(false);
				setIsCodeSent(false);
				sendEmailMutation.reset();
				verifyEmailMutation.reset();
			}
		};

	const passwordMismatch =
		formData.confirmPassword !== "" &&
		formData.password !== formData.confirmPassword;

	const canSubmit =
		isNameChecked &&
		isEmailVerified &&
		formData.password !== "" &&
		formData.confirmPassword !== "" &&
		!passwordMismatch;

	// 회원가입 성공 화면
	if (isSignupSuccess) {
		return (
			<LayoutWithTop title="회원가입">
				<div className="flex flex-col items-center justify-center min-h-[60vh] p-4 space-y-6">
					<div className="text-center space-y-4">
						<div className="text-6xl">🎉</div>
						<h2 className="text-2xl font-bold">회원가입 완료!</h2>
						<p className="text-gray-600">
							회원가입이 성공적으로 완료되었습니다.
						</p>
						<p className="text-sm text-gray-500">
							잠시 후 자동으로 이동됩니다...
						</p>
					</div>
				</div>
			</LayoutWithTop>
		);
	}

	return (
		<LayoutWithTop
			showBackButton
			title="회원가입"
			onBackButtonClick={() => router.navigate({ to: "/my" })}
		>
			<div className="p-4 space-y-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* 이름 + 중복확인 */}
					<div className="space-y-2">
						<Label htmlFor="name">이름</Label>
						<div className="flex gap-2">
							<Input
								id="name"
								type="text"
								value={formData.name}
								onChange={handleInputChange("name")}
								required
								className="flex-1"
							/>
							<Button
								type="button"
								variant="outline"
								onClick={() =>
									nameCheckMutation.mutate({ name: formData.name })
								}
								disabled={
									!formData.name ||
									nameCheckMutation.isPending ||
									isNameChecked
								}
							>
								{nameCheckMutation.isPending
									? "확인 중..."
									: isNameChecked
										? "사용가능"
										: "중복확인"}
							</Button>
						</div>
						{nameCheckMutation.isSuccess &&
							nameCheckMutation.data.isDuplicate && (
								<p className="text-sm text-red-500">
									이미 사용 중인 이름입니다.
								</p>
							)}
						{isNameChecked && (
							<p className="text-sm text-green-600">
								사용 가능한 이름입니다.
							</p>
						)}
					</div>

					{/* 이메일 + 인증코드 전송 */}
					<div className="space-y-2">
						<Label htmlFor="email">이메일</Label>
						<div className="flex gap-2">
							<Input
								id="email"
								type="email"
								value={formData.email}
								onChange={handleInputChange("email")}
								required
								className="flex-1"
								disabled={isEmailVerified}
							/>
							<Button
								type="button"
								variant="outline"
								onClick={() =>
									sendEmailMutation.mutate({ email: formData.email })
								}
								disabled={
									!formData.email ||
									sendEmailMutation.isPending ||
									isEmailVerified
								}
							>
								{sendEmailMutation.isPending
									? "전송 중..."
									: isEmailVerified
										? "인증완료"
										: isCodeSent
											? "재전송"
											: "인증코드 전송"}
							</Button>
						</div>
						{sendEmailMutation.isError && (
							<p className="text-sm text-red-500">
								이메일 전송에 실패했습니다.
							</p>
						)}
					</div>

					{/* 인증코드 입력 */}
					{isCodeSent && !isEmailVerified && (
						<div className="space-y-2">
							<Label htmlFor="verificationCode">인증코드</Label>
							<div className="flex gap-2">
								<Input
									id="verificationCode"
									type="text"
									value={formData.verificationCode}
									onChange={handleInputChange("verificationCode")}
									placeholder="인증코드 입력"
									className="flex-1"
								/>
								<Button
									type="button"
									variant="outline"
									onClick={() =>
										verifyEmailMutation.mutate({
											email: formData.email,
											code: formData.verificationCode,
										})
									}
									disabled={
										!formData.verificationCode ||
										verifyEmailMutation.isPending
									}
								>
									{verifyEmailMutation.isPending ? "확인 중..." : "확인"}
								</Button>
							</div>
							{verifyEmailMutation.isError && (
								<p className="text-sm text-red-500">
									인증코드가 올바르지 않습니다.
								</p>
							)}
						</div>
					)}

					{isEmailVerified && (
						<p className="text-sm text-green-600">
							이메일 인증이 완료되었습니다.
						</p>
					)}

					{/* 비밀번호 */}
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

					{/* 비밀번호 확인 */}
					<div className="space-y-2">
						<Label htmlFor="confirmPassword">비밀번호 확인</Label>
						<Input
							id="confirmPassword"
							type="password"
							value={formData.confirmPassword}
							onChange={handleInputChange("confirmPassword")}
							required
						/>
						{passwordMismatch && (
							<p className="text-sm text-red-500">
								비밀번호가 일치하지 않습니다.
							</p>
						)}
					</div>

					{signupMutation.isError && (
						<p className="text-sm text-red-500">
							회원가입에 실패했습니다. 다시 시도해주세요.
						</p>
					)}

					<Button
						type="submit"
						className="w-full"
						disabled={!canSubmit || signupMutation.isPending}
					>
						{signupMutation.isPending ? "가입 중..." : "회원가입"}
					</Button>
				</form>
			</div>
		</LayoutWithTop>
	);
}
