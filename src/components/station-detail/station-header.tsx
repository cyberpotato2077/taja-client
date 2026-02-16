import { MapPin } from "lucide-react";
import type { ReactNode } from "react";

interface StationHeaderProps {
	stationId: number;
	name: string;
	address: string;
	rightAddon?: ReactNode;
}

export function StationHeader({
	stationId,
	name,
	address,
	rightAddon,
}: StationHeaderProps) {
	return (
		<div className="border-b pb-3">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold text-gray-900 mb-1">{name}</h2>
				{rightAddon}
			</div>
			<div className="flex items-center gap-2 text-sm text-gray-600">
				<MapPin className="w-4 h-4" />
				<span>{address}</span>
			</div>
			<div className="mt-1 text-xs text-gray-500">ID: {stationId}</div>
		</div>
	);
}
