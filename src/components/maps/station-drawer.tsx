import { stationQueryOptions } from "@/queries/station-query-options";
import { Suspense } from "@suspensive/react";
import { SuspenseQuery } from "@suspensive/react-query-5";
import { useNavigate } from "@tanstack/react-router";
import { StationDetail } from "../station-detail";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "../ui/drawer";

type StationDrawerProps = {
	open: boolean;
	close: () => void;
	stationId: number;
};

export function StationDrawer({ open, close, stationId }: StationDrawerProps) {
	const navigate = useNavigate();

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
					navigate({
						to: "/station/$id",
						params: {
							id: stationId.toString(),
						},
					});
					close();
				}}
			>
				<div className="mx-auto w-full flex flex-col max-h-[70vh]">
					<Suspense
						fallback={<div className="text-center h-[70vh]">Loading...</div>}
					>
						<SuspenseQuery {...stationQueryOptions.detail({ stationId })}>
							{({ data: station }) => <StationDetail station={station} />}
						</SuspenseQuery>
					</Suspense>
				</div>
				<DrawerFooter>
					<DrawerClose asChild>
						<Button className="flex-1" variant="outline">
							닫기
						</Button>
					</DrawerClose>
					<Button
						className="flex-1"
						onClick={() => {
							navigate({
								to: "/station/$id",
								params: {
									id: stationId.toString(),
								},
							});
							close();
						}}
					>
						자세히 보기
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
