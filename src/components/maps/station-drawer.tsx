import { stationQueryOptions } from "@/queries/station-query-options";
import { useQuery } from "@tanstack/react-query";
import type { useNavigate } from "@tanstack/react-router";
import { StationDetail } from "../station-detail";
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
	} = useQuery(stationQueryOptions.detail({ id: stationId }));

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
				<div className="mx-auto w-full">
					{isError ? (
						<></>
					) : isPending ? (
						<></>
					) : (
						<StationDetail station={station} />
					)}

					<DrawerFooter>
						<Button
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
						<DrawerClose asChild>
							<Button variant="outline">닫기</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
