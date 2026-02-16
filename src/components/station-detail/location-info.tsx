interface LocationInfoProps {
	latitude: number;
	longitude: number;
}

export function LocationInfo({ latitude, longitude }: LocationInfoProps) {
	return (
		<div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
			<div className="grid grid-cols-2 gap-2">
				<div>
					<span className="font-medium">위도:</span> {latitude.toFixed(6)}
				</div>
				<div>
					<span className="font-medium">경도:</span> {longitude.toFixed(6)}
				</div>
			</div>
		</div>
	);
}
