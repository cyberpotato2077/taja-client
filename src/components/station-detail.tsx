import type { Station } from "@/remotes/get-station";

export function StationDetail({ station }: { station: Station }) {
	return (
		<div className="p-4 pb-0 text-sm text-gray-700">
			<p>
				Latitude: <span className="font-medium">{station.latitude}</span>
			</p>
			<p>
				Longitude: <span className="font-medium">{station.longitude}</span>
			</p>
			<p>
				Available Bikes (Observed):{" "}
				<span className="font-medium">
					{station.todayAvailableBike?.observedBikeCountByHour?.slice(-1)[0]
						?.bikeCount ?? "N/A"}
				</span>
			</p>
			<p>
				Available Bikes (Predicted):{" "}
				<span className="font-medium">
					{station.todayAvailableBike?.predictedBikeCountByHour?.slice(-1)[0]
						?.bikeCount ?? "N/A"}
				</span>
			</p>
		</div>
	);
}
