import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { LOCATIONS } from "@/constants/locations";
import { useMainQueryStates } from "@/hooks/use-main-query-states";
import { stationQueryOptions } from "@/queries/station-query-options";
import { useQuery } from "@tanstack/react-query";
import { useMap } from "@vis.gl/react-google-maps";
import { disassemble } from "es-hangul";
import { useState } from "react";

export function SearchBar() {
	const map = useMap();

	if (map == null) {
		return null;
	}

	const [coordinates, setCoordinates] = useMainQueryStates();
	const [query, setQuery] = useState("");

	const {
		data: searchedStations,
		isPending,
		isError,
	} = useQuery({
		...stationQueryOptions.search({
			keyword: query,
			lat: coordinates.latitude,
			lng: coordinates.longitude,
		}),
		enabled: query.trim().length > 0,
	});

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
				}).slice(0, 5);

	return (
		<div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-screen-sm px-4 z-50">
			<Command shouldFilter={false}>
				{/* 입력창 */}
				<CommandInput
					placeholder="지역이나 충전소를 검색할 수 있어요."
					value={query}
					onValueChange={setQuery}
					onClear={() => setQuery("")}
				/>
				{/* 검색어 있을 때만 목록 표시 */}
				{query.trim().length > 0 ? (
					<CommandList className="max-h-60 overflow-auto">
						<CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
						{filteredLocations.length > 0 ? (
							<CommandGroup heading="검색 결과">
								{isError ? (
									<></>
								) : isPending ? (
									<></>
								) : (
									filteredLocations.map((location) => (
										<CommandItem
											key={location.name}
											onSelect={() => {
												map.panTo({
													lat: location.latitude,
													lng: location.longitude,
												});
											}}
											className="flex"
										>
											<div>{location.name}</div>
											<div className="text-xs text-gray-500">
												{location.address}
											</div>
										</CommandItem>
									))
								)}
							</CommandGroup>
						) : null}
					</CommandList>
				) : null}
			</Command>
		</div>
	);
}
