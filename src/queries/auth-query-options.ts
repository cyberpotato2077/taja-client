import {
	type CheckDuplicateNameRequest,
	type EmailRequest,
	type LoginRequest,
	type SignUpRequest,
	type VerifyEmailRequest,
	checkNameDuplicate,
	login,
	logout,
	reissueToken,
	sendEmail,
	signup,
	verifyEmail,
} from "@/remotes/auth";
import { getMember } from "@/remotes/get-member";
import { queryOptions } from "@tanstack/react-query";

export const authQueryOptions = {
	auth: ["auth"],
	login: (request: LoginRequest) => {
		return queryOptions({
			queryKey: [...authQueryOptions.auth, "login", request],
			queryFn: () => login(request),
		});
	},
	signup: (request: SignUpRequest) => {
		return queryOptions({
			queryKey: [...authQueryOptions.auth, "signup", request],
			queryFn: () => signup(request),
		});
	},
	logout: () => {
		return queryOptions({
			queryKey: [...authQueryOptions.auth, "logout"],
			queryFn: () => logout(),
		});
	},
	reissueToken: () => {
		return queryOptions({
			queryKey: [...authQueryOptions.auth, "reissue-token"],
			queryFn: () => reissueToken(),
		});
	},
	checkNameDuplicate: (request: CheckDuplicateNameRequest) => {
		return queryOptions({
			queryKey: [...authQueryOptions.auth, "check-name-duplicate", request],
			queryFn: () => checkNameDuplicate(request),
		});
	},
	sendEmail: (request: EmailRequest) => {
		return queryOptions({
			queryKey: [...authQueryOptions.auth, "send-email", request],
			queryFn: () => sendEmail(request),
		});
	},
	verifyEmail: (request: VerifyEmailRequest) => {
		return queryOptions({
			queryKey: [...authQueryOptions.auth, "verify-email", request],
			queryFn: () => verifyEmail(request),
		});
	},
	member: () => {
		return queryOptions({
			queryKey: [...authQueryOptions.auth, "member"],
			queryFn: () => getMember(),
		});
	},
};
