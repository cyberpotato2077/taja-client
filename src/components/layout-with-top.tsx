import type { ComponentProps, ReactNode } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface TopProps {
	title?: string;
	customButton?: ReactNode;
	showBackButton?: boolean;
}

export function LayoutWithTop({
	title,
	customButton,
	showBackButton = true,
}: TopProps) {
	return (
		<div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-h-[100vh] max-w-screen-sm bg-white">
			<header className="h-[40px] flex justify items-center justify-between px-4 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
				<div className="w-1/5">
					{showBackButton && (
						<button type="button" className="p-2">
							<ChevronLeftIcon className="h-6 w-6" />
						</button>
					)}
				</div>
				<h1 className="w-3/5 text-center text-lg font-semibold">{title}</h1>
				<div className="w-1/5 flex justify-end">{customButton}</div>
			</header>
			<ScrollArea className="h-[calc(100vh-96px)] overflow-auto bg-white">
				{Array.from({ length: 50 }, (_, i) => (
					<div
						key={`row-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							i
						}`}
					>
						{i}
					</div>
				))}
			</ScrollArea>
		</div>
	);
}

function ChevronLeftIcon(props: ComponentProps<"svg">) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>chevron-left</title>
			<path d="m15 18-6-6 6-6" />
		</svg>
	);
}
