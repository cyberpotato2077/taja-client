import { http, HttpResponse } from "msw";
import type { DeleteMemberRequest, DeleteMemberResponse } from "./index";

export const deleteMemberMock = http.delete(
	"/api/member",
	async ({ request }) => {
		const body = (await request.json()) as DeleteMemberRequest;

		console.log("msw:delete :: /api/member", { password: body.password });

		if (body.password === "password") {
			return HttpResponse.json<DeleteMemberResponse>({
				code: "SUCCESS",
				message: "회원 탈퇴에 성공했습니다.",
			});
		}

		return HttpResponse.json<DeleteMemberResponse>(
			{
				code: "INVALID_PASSWORD",
				message: "비밀번호가 일치하지 않습니다.",
			},
			{ status: 400 },
		);
	},
);
