import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useCallback } from "react";
import { useOverlay } from "./use-overlay";

interface DialogOptions {
	title: string;
	description?: string | React.ReactNode;
	confirmText?: string;
	cancelText?: string;
	onlyConfirm?: boolean;
}

export function useDialog() {
	const overlay = useOverlay();

	const openDialog = useCallback(
		(options: DialogOptions): Promise<boolean> => {
			return new Promise((resolve) => {
				overlay.open(({ isOpen, close }) => {
					const handleConfirm = () => {
						close();
						resolve(true);
					};

					const handleCancel = () => {
						close();
						resolve(false);
					};

					const handleOpenChange = (open: boolean) => {
						if (!open) {
							handleCancel();
						}
					};

					return (
						<Dialog open={isOpen} onOpenChange={handleOpenChange}>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>{options.title}</DialogTitle>
									{options.description && (
										<DialogDescription>{options.description}</DialogDescription>
									)}
								</DialogHeader>
								<DialogFooter>
									{!options.onlyConfirm && (
										<Button variant="outline" onClick={handleCancel}>
											{options.cancelText ?? "취소"}
										</Button>
									)}
									<Button onClick={handleConfirm}>
										{options.confirmText ?? "확인"}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					);
				});
			});
		},
		[overlay],
	);

	return { openDialog };
}
