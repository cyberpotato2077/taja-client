import { http } from "@/utils/http";

export type GetStationRequest = {
	id: string;
};

// The user will provide the actual interface later, so I'll create a placeholder.
export type Station = {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	bikeCount: number;
	createdAt: string;
};

export function getStation(params: GetStationRequest) {
	return http.get<Station>(`stations/${params.id}`);
}
