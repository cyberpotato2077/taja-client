import { stationQueryOptions } from "@/queries/station-query-options";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "../ui/drawer";

export function StationDrawer({
	open,
	close,
	stationId,
}: { open: boolean; close: () => void; stationId: number }) {
	const {
		data: station,
		isLoading,
		error,
	} = useQuery(stationQueryOptions.detail({ id: stationId }));

	return (
		<Drawer open={open} onOpenChange={close}>
			<DrawerContent
				className="max-w-screen-sm !left-1/2 !-translate-x-1/2 w-full"
				onDragEndNorth={() => alert("Dragged North!")}
			>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>
							{isLoading
								? "Loading..."
								: error
									? "Error"
									: station?.name || "Station Details"}
						</DrawerTitle>
						<DrawerDescription>
							{error
								? error.message
								: station?.address || "No station selected"}
						</DrawerDescription>
					</DrawerHeader>

					{station && !isLoading && !error && (
						<div className="p-4 pb-0 text-sm text-gray-700">
							<p>
								Latitude:{" "}
								<span className="font-medium">{station.latitude}</span>
							</p>
							<p>
								Longitude:{" "}
								<span className="font-medium">{station.longitude}</span>
							</p>
							<p>
								Available Bikes (Observed):{" "}
								<span className="font-medium">
									{station.todayAvailableBike?.observedBikeCountByHour?.slice(
										-1,
									)[0]?.bikeCount ?? "N/A"}
								</span>
							</p>
							<p>
								Available Bikes (Predicted):{" "}
								<span className="font-medium">
									{station.todayAvailableBike?.predictedBikeCountByHour?.slice(
										-1,
									)[0]?.bikeCount ?? "N/A"}
								</span>
							</p>
						</div>
					)}

					<DrawerFooter>
						<Button>Submit</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
