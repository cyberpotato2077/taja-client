import { http } from "@/utils/http";

export interface DeleteMemberRequest {
	password: string;
}

export interface DeleteMemberResponse {
	code: string;
	message: string;
}

export function deleteMember(request: DeleteMemberRequest) {
	return http.delete<DeleteMemberResponse>("/member", request);
}
