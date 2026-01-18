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
}: { open: boolean; close: () => void }) {
	return (
		<Drawer open={open} onOpenChange={close}>
			<DrawerContent
				className="max-w-screen-sm !left-1/2 !-translate-x-1/2 w-full"
				onDragEndNorth={() => alert("Dragged North!")}
			>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>DD</DrawerTitle>
						<DrawerDescription>FF</DrawerDescription>
					</DrawerHeader>

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
