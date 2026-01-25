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
import { useMemo, useState } from "react";

export function SearchBar() {
	const map = useMap();

	if (map == null) {
		return null;
	}

	const [coordinates] = useMainQueryStates();
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

	const combinedResults = useMemo(() => {
		const locations = filteredLocations.map((location) => ({
			id: location.name,
			name: location.name,
			address: location.address,
			latitude: location.latitude,
			longitude: location.longitude,
		}));

		const stations = (searchedStations ?? []).map((station) => ({
			id: station.stationId,
			name: station.name,
			address: station.address,
			latitude: station.latitude,
			longitude: station.longitude,
		}));

		return [...locations, ...stations];
	}, [filteredLocations, searchedStations]);

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
						{(combinedResults.length > 0 || isPending || isError) && (
							<CommandGroup heading="검색 결과">
								{combinedResults.map((result) => (
									<CommandItem
										key={result.id}
										onSelect={() => {
											map.panTo({
												lat: result.latitude,
												lng: result.longitude,
											});
											setQuery("");
										}}
										className="flex flex-col items-start"
									>
										<div>{result.name}</div>
										<div className="text-xs text-gray-500">
											{result.address}
										</div>
									</CommandItem>
								))}
								{isPending && <CommandItem disabled>검색 중...</CommandItem>}
								{isError && (
									<CommandItem disabled>오류가 발생했습니다.</CommandItem>
								)}
							</CommandGroup>
						)}
					</CommandList>
				) : null}
			</Command>
		</div>
	);
}
