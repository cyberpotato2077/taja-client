import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { LOCATIONS } from "@/constants/locations";
import { disassemble } from "es-hangul";
import { useState } from "react";

export function SearchBar() {
	const [query, setQuery] = useState("");

	const filteredLocations =
		query.trim() === ""
			? []
			: LOCATIONS.filter((location) => {
					const disassembledQuery = disassemble(query.toLowerCase());
					const disassembledName = disassemble(location.name.toLowerCase());
					const disassembledAddress = disassemble(
						location.address.toLowerCase(),
					);
					return (
						disassembledName.includes(disassembledQuery) ||
						disassembledAddress.includes(disassembledQuery)
					);
				});

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
						<CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
						{filteredLocations.length > 0 ? (
							<CommandGroup heading="검색 결과">
								{filteredLocations.map((location) => (
									<CommandItem
										key={location.name}
										onSelect={() => {
											// TODO: 선택 시 동작 추가
											console.log("Selected:", location);
										}}
									>
										{location.name}
									</CommandItem>
								))}
							</CommandGroup>
						) : null}
					</CommandList>
				) : null}
			</Command>
		</div>
	);
}
