import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "@/constants/maps";
import { useMap } from "@vis.gl/react-google-maps";
import type { ComponentProps } from "react";

export function MapController() {
	const map = useMap();

	if (map == null) {
		return null;
	}

	const goToCurrentLocation = () => {
		map.panTo({
			lat: DEFAULT_LATITUDE,
			lng: DEFAULT_LONGITUDE,
		});
	};

	const zoom = (type: "in" | "out") => {
		const currentZoom = map.getZoom();
		if (currentZoom == null) {
			return;
		}

		map.setZoom(type === "in" ? currentZoom + 1 : currentZoom - 1);
	};

	return (
		<div className="fixed bottom-18 right-4 z-1 flex flex-col gap-2 rounded-lg bg-white p-2 shadow-lg">
			<button
				type="button"
				className="cursor-pointer"
				onClick={goToCurrentLocation}
			>
				<LocateFixedIcon className="h-6 w-6 text-gray-500" />
			</button>
			<button
				type="button"
				className="cursor-pointer"
				onClick={() => zoom("in")}
			>
				<PlusIcon className="h-6 w-6 text-gray-500" />
			</button>
			<button
				type="button"
				className="cursor-pointer"
				onClick={() => zoom("out")}
			>
				<MinusIcon className="h-6 w-6 text-gray-500" />
			</button>
		</div>
	);
}

function LocateFixedIcon(props: ComponentProps<"svg">) {
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
			<title>locate-fixed</title>
			<line x1="2" y1="12" x2="5" y2="12" />
			<line x1="19" y1="12" x2="22" y2="12" />
			<line x1="12" y1="2" x2="12" y2="5" />
			<line x1="12" y1="19" x2="12" y2="22" />
			<circle cx="12" cy="12" r="7" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	);
}

function PlusIcon(props: ComponentProps<"svg">) {
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
			<title>plus</title>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</svg>
	);
}

function MinusIcon(props: ComponentProps<"svg">) {
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
			<title>minus</title>
			<path d="M5 12h14" />
		</svg>
	);
}
