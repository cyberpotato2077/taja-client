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
		<div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-screen-sm px-4 z-50">
			<Command>
				{/* 입력창 */}
				<CommandInput
					placeholder="지역이나 충전소를 검색할 수 있어요."
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
		</div>
	);
}
