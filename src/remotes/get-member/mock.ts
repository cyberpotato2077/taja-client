import { http, HttpResponse } from "msw";
import type { MemberResponse } from "./index";

const mockMember: MemberResponse = {
	memberId: 1,
	name: "testname",
	email: "test@test.com",
};

export const getMemberMock = http.get("/api/member", () => {
	return HttpResponse.json<MemberResponse>(mockMember);
});
