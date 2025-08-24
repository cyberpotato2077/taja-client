import { StationDrawer } from "@/components/maps/station-drawer";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { useOverlay } from "@/hooks/use-overlay";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const overlay = useOverlay();
	return (
		<div>
			<SearchBar />
			<div className="bg-red-400 h-[100vh] w-full">
				지도
				{/* 지도 들어올때까지 임시로 세팅함 */}
				<div className="h-[400px]" />
				<Button
					onClick={() =>
						overlay.open(({ isOpen, close }) => (
							<StationDrawer open={isOpen} close={close} />
						))
					}
				>
					드로어 열기
				</Button>
			</div>
		</div>
	);
}
