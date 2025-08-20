import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { useState } from "react";

export function SearchBar() {
	const [query, setQuery] = useState("");

	return (
		<Command className="fixed top-4 left-1/2 w-[90%] max-w-4xl -translate-x-1/2 rounded-xl border bg-white shadow-md h-auto">
			{/* 입력창 */}
			<CommandInput
				placeholder="Type a command or search..."
				value={query}
				onValueChange={setQuery}
			/>

			{/* 검색어 있을 때만 목록 표시 */}
			{query.trim().length > 0 ? (
				<CommandList className="max-h-60 overflow-auto">
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>Calendar</CommandItem>
						<CommandItem>Search Emoji</CommandItem>
						<CommandItem>Calculator</CommandItem>
					</CommandGroup>
				</CommandList>
			) : null}
		</Command>
	);
}
