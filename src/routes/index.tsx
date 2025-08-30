import { SearchBar } from "@/components/search-bar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div>
			<SearchBar />
		</div>
	);
}
