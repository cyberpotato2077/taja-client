import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { useDialog } from "./use-dialog";

export function useLoginDialog() {
	const { openDialog } = useDialog();
	const navigate = useNavigate();

	const openLoginDialog = useCallback(async () => {
		const confirmed = await openDialog({
			title: "회원 전용 기능",
			description: (
				<>
					즐겨찾기는 회원만 사용할 수 있는 기능입니다.
					<br />
					로그인 또는 회원가입을 진행하시겠습니까?
				</>
			),
			confirmText: "로그인/회원가입",
			cancelText: "취소",
		});

		if (confirmed) {
			navigate({ to: "/my" });
		}
	}, [openDialog, navigate]);

	return { openLoginDialog };
}
