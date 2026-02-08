import type { MapStationResponse } from "@/remotes/get-favorite-stations";

// Shared favorite stations state
export const mockFavoriteStationsState: MapStationResponse[] = [
	{
		stationId: 1001,
		number: 1001,
		latitude: 37.5,
		longitude: 126.97,
		bikeCount: 5,
		requestedAt: new Date().toISOString(),
	},
	{
		stationId: 1002,
		number: 1002,
		latitude: 37.5,
		longitude: 126.9,
		bikeCount: 3,
		requestedAt: new Date().toISOString(),
	},
	{
		stationId: 1003,
		number: 1003,
		latitude: 37.3,
		longitude: 126.9,
		bikeCount: 4,
		requestedAt: new Date().toISOString(),
	},
	{
		stationId: 1004,
		number: 1004,
		latitude: 37.5,
		longitude: 126,
		bikeCount: 7,
		requestedAt: new Date().toISOString(),
	},
];

// Helper functions to manage favorite state
export const isStationFavorite = (stationId: number): boolean => {
	return mockFavoriteStationsState.some(
		(station) => station.stationId === stationId,
	);
};

export const addStationToFavorites = (stationId: number): boolean => {
	if (isStationFavorite(stationId)) {
		return false; // Already in favorites
	}

	// Create a mock station for the new favorite
	const newFavoriteStation: MapStationResponse = {
		stationId,
		number: stationId,
		latitude: 37.5 + (Math.random() - 0.5) * 0.2, // Random latitude around Seoul
		longitude: 126.9 + (Math.random() - 0.5) * 0.2, // Random longitude around Seoul
		bikeCount: Math.floor(Math.random() * 10) + 1, // Random bike count
		requestedAt: new Date().toISOString(),
	};

	mockFavoriteStationsState.push(newFavoriteStation);
	return true;
};

export const removeStationFromFavorites = (stationId: number): boolean => {
	const index = mockFavoriteStationsState.findIndex(
		(station) => station.stationId === stationId,
	);

	if (index === -1) {
		return false; // Not in favorites
	}

	mockFavoriteStationsState.splice(index, 1);
	return true;
};
