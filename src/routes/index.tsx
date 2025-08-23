import { StationDrawer } from "@/components/maps/station-drawer";
import { SearchBar } from "@/components/search-bar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div>
			<SearchBar />
			<div className="bg-red-400 h-[100vh] w-full">
				지도
				<StationDrawer />
			</div>
		</div>
	);
}
