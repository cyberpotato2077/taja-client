import { http } from "@/utils/http";

export interface MemberResponse {
	memberId: number;
	name: string;
	email: string;
}

export function getMember() {
	return http.get<MemberResponse>("/member");
}
