import { http } from "@/utils/http";

export interface LoginRequest {
	email: string;
	password: string;
}

export interface SignUpRequest {
	name: string;
	email: string;
	password: string;
}

export interface TokenResponse {
	accessToken: string;
}

export interface CheckDuplicateNameRequest {
	name: string;
}

export interface CheckDuplicateNameResponse {
	isDuplicate: boolean;
}

export interface EmailRequest {
	email: string;
}

export interface VerifyEmailRequest {
	email: string;
	code: string;
}

export function login(request: LoginRequest) {
	return http.post<TokenResponse>("/auth/login", request);
}

export function signup(request: SignUpRequest) {
	return http.post<string>("/auth/signup", request);
}

export function logout() {
	return http.post<string>("/auth/logout", {});
}

export function reissueToken() {
	return http.post<TokenResponse>("/auth/token", {});
}

export function checkNameDuplicate(request: CheckDuplicateNameRequest) {
	return http.post<CheckDuplicateNameResponse>(
		"/auth/name/duplicate-check",
		request,
	);
}

export function sendEmail(request: EmailRequest) {
	return http.post<string>("/auth/email/send", request);
}

export function verifyEmail(request: VerifyEmailRequest) {
	return http.post<string>("/auth/email/verify", request);
}
