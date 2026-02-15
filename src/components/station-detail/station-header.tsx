import { MapPin, Star } from "lucide-react";

interface StationHeaderProps {
	stationId: number;
	name: string;
	address: string;
	isFavorite: boolean;
	onToggleFavorite: () => void;
	isLoading: boolean;
}

export function StationHeader({
	stationId,
	name,
	address,
	isFavorite,
	onToggleFavorite,
	isLoading,
}: StationHeaderProps) {
	return (
		<div className="border-b pb-3">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold text-gray-900 mb-1">{name}</h2>
				<button
					type="button"
					onClick={onToggleFavorite}
					className="p-2 rounded-full hover:bg-gray-100 transition-colors"
					disabled={isLoading}
				>
					<Star
						className={`w-5 h-5 ${
							isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
						} transition-colors`}
					/>
				</button>
			</div>
			<div className="flex items-center gap-2 text-sm text-gray-600">
				<MapPin className="w-4 h-4" />
				<span>{address}</span>
			</div>
			<div className="mt-1 text-xs text-gray-500">ID: {stationId}</div>
		</div>
	);
}
