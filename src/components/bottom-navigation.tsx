import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

export function BottomNavigation() {
	return (
		<nav
			className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex h-[70px] w-full max-w-screen-sm items-center justify-around bg-background pb-safe shadow-[0_-2px_4px_rgba(0,0,0,0.1)]"
			style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
		>
			<Link
				to="/"
				className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary"
			>
				<HomeIcon className="h-5 w-5" />
				지도
			</Link>
			<Link
				to="/ranking"
				className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary"
			>
				<TrophyIcon className="h-5 w-5" />
				랭킹
			</Link>
			<Link
				to="/my"
				className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary"
			>
				<UserIcon className="h-5 w-5" />
				MY
			</Link>
		</nav>
	);
}

function HomeIcon(props: ComponentProps<"svg">) {
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
			<title>home</title>
			<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		</svg>
	);
}

function TrophyIcon(props: ComponentProps<"svg">) {
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
			<title>trophy</title>
			<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
			<path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
			<path d="M4 22h16" />
			<path d="M10 14.66V17a2 2 0 0 0 4 0v-2.34" />
			<path d="M18 10c-1.5 1.5-2.83 3.09-3.55 4.66a4 4 0 0 1-4.9 0C8.83 13.09 7.5 11.5 6 10c-.5-1-1-2.5-1-4 0-2 2-3 3.5-3h7c1.5 0 3.5 1 3.5 3 0 1.5-.5 3-1 4Z" />
		</svg>
	);
}

function UserIcon(props: ComponentProps<"svg">) {
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
			<title>user</title>
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	);
}
