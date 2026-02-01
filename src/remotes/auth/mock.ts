import { http, HttpResponse } from "msw";
import type {
	CheckDuplicateNameRequest,
	CheckDuplicateNameResponse,
	EmailRequest,
	LoginRequest,
	SignUpRequest,
	TokenResponse,
	VerifyEmailRequest,
} from "./index";

export const loginMock = http.post("/api/auth/login", async ({ request }) => {
	const body = (await request.json()) as LoginRequest;

	if (body.email === "test@example.com" && body.password === "password") {
		return HttpResponse.json<TokenResponse>({
			accessToken: "mock-access-token",
		});
	}

	return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
});

export const signupMock = http.post("/api/auth/signup", async ({ request }) => {
	const body = (await request.json()) as SignUpRequest;

	if (body.email && body.name && body.password) {
		return HttpResponse.json<string>("User created successfully");
	}

	return HttpResponse.json({ error: "Invalid input" }, { status: 400 });
});

export const logoutMock = http.post("/api/auth/logout", () => {
	return HttpResponse.json<string>("Logout successful");
});

export const reissueTokenMock = http.post("/api/auth/token", () => {
	return HttpResponse.json<TokenResponse>({
		accessToken: "new-mock-access-token",
	});
});

export const checkNameDuplicateMock = http.post(
	"/api/auth/name/duplicate-check",
	async ({ request }) => {
		const body = (await request.json()) as CheckDuplicateNameRequest;

		const isDuplicate = body.name === "duplicate";

		return HttpResponse.json<CheckDuplicateNameResponse>({
			isDuplicate,
		});
	},
);

export const sendEmailMock = http.post(
	"/api/auth/email/send",
	async ({ request }) => {
		const body = (await request.json()) as EmailRequest;

		if (body.email) {
			return HttpResponse.json<string>("Email sent successfully");
		}

		return HttpResponse.json({ error: "Invalid email" }, { status: 400 });
	},
);

export const verifyEmailMock = http.post(
	"/api/auth/email/verify",
	async ({ request }) => {
		const body = (await request.json()) as VerifyEmailRequest;

		if (body.email && body.code === "123456") {
			return HttpResponse.json<string>("Email verified successfully");
		}

		return HttpResponse.json(
			{ error: "Invalid verification code" },
			{ status: 400 },
		);
	},
);
