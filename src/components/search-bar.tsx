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
import type { StationSimpleResponse } from "@/remotes/search-stations";
import { useQuery } from "@tanstack/react-query";
import { useMap } from "@vis.gl/react-google-maps";
import { disassemble } from "es-hangul";
import { useMemo, useState } from "react";

type SearchResult = {
	id: string;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
};

const normalize = (text: string) => disassemble(text.toLowerCase());

export function SearchBar() {
	const map = useMap();
	if (!map) return null;

	const [{ latitude, longitude }, setMainQueryStates] = useMainQueryStates();
	const [query, setQuery] = useState("");

	const normalizedQuery = useMemo(() => normalize(query), [query]);

	const {
		data: searchedStations,
		isPending,
		isError,
	} = useQuery({
		...stationQueryOptions.search({
			keyword: query,
			lat: latitude,
			lng: longitude,
		}),
		enabled: query.trim().length > 0,
	});

	const filteredLocations = useMemo<SearchResult[]>(() => {
		if (!query.trim()) return [];

		return LOCATIONS.filter((location) => {
			const name = normalize(location.name);
			const address = normalize(location.address);

			return (
				name.includes(normalizedQuery) || address.includes(normalizedQuery)
			);
		})
			.slice(0, 5)
			.map((location) => ({
				id: location.name,
				name: location.name,
				address: location.address,
				latitude: location.latitude,
				longitude: location.longitude,
			}));
	}, [query, normalizedQuery]);

	const combinedResults = useMemo<SearchResult[]>(() => {
		if (!query.trim()) return [];

		const stations: SearchResult[] = (searchedStations ?? []).map(
			(station: StationSimpleResponse) => ({
				id: String(station.stationId),
				name: station.name,
				address: station.address,
				latitude: station.latitude,
				longitude: station.longitude,
			}),
		);

		const getScore = (name: string) => {
			const disassembledName = normalize(name);
			const index = disassembledName.indexOf(normalizedQuery);

			if (index === -1) return Number.POSITIVE_INFINITY;

			// 낮을수록 우선
			return index * 1000 + disassembledName.length;
		};

		return [...filteredLocations, ...stations]
			.sort((a, b) => getScore(a.name) - getScore(b.name))
			.slice(0, 10);
	}, [filteredLocations, searchedStations, query, normalizedQuery]);

	const showResults = query.trim().length > 0;

	return (
		<div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-screen-sm px-4 z-50">
			<Command shouldFilter={false}>
				<CommandInput
					placeholder="지역이나 대여소를 검색할 수 있어요."
					value={query}
					onValueChange={setQuery}
					onClear={() => setQuery("")}
				/>

				{showResults && (
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
											setMainQueryStates({
												activeStationId: Number(result.id),
												latitude: result.latitude,
												longitude: result.longitude,
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
				)}
			</Command>
		</div>
	);
}
