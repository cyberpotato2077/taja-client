import { stationQueryOptions } from "@/queries/station-query-options";
import { useQuery } from "@tanstack/react-query";
import type { useNavigate } from "@tanstack/react-router";
import { StationDetail } from "../station-detail";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "../ui/drawer";

type StationDrawerProps = {
	open: boolean;
	close: () => void;
	stationId: number;
	navigate: ReturnType<typeof useNavigate>;
};

export function StationDrawer({
	open,
	close,
	stationId,
	navigate,
}: StationDrawerProps) {
	const {
		data: station,
		isPending,
		isError,
	} = useQuery(stationQueryOptions.detail({ stationId }));

	return (
		<Drawer
			open={open}
			onOpenChange={() => {
				close();
			}}
		>
			<DrawerContent
				className="max-w-screen-sm !left-1/2 !-translate-x-1/2 w-full"
				onDragEndNorth={() => {
					const id = station?.stationId;
					if (id != null) {
						navigate({
							to: "/station/$id",
							params: {
								id: String(id),
							},
						});
						close();
					}
				}}
			>
				<div className="mx-auto w-full flex flex-col max-h-[70vh]">
					{isError ? (
						<></>
					) : isPending ? (
						<></>
					) : (
						<div className="overflow-y-auto flex-1">
							<StationDetail station={station} navigate={navigate} />
						</div>
					)}

					<DrawerFooter>
						<DrawerClose asChild>
							<Button className="flex-1" variant="outline">
								닫기
							</Button>
						</DrawerClose>
						<Button
							className="flex-1"
							onClick={() => {
								const id = station?.stationId;
								if (id != null) {
									navigate({
										to: "/station/$id",
										params: {
											id: String(id),
										},
									});
									close();
								}
							}}
						>
							자세히 보기
						</Button>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
