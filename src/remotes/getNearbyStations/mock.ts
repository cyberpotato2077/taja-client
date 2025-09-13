import { http, HttpResponse } from "msw";

type Station = {
  number: number;
  bikeCount: number;
  latitude: number;
  longitude: number;
  requestedAt: string;
};

const MOCK_STATIONS: Station[] = [
  {
    number: 1,
    bikeCount: 5,
    latitude: 37.5665,
    longitude: 126.978,
    requestedAt: new Date().toISOString(),
  },
  {
    number: 2,
    bikeCount: 10,
    latitude: 37.565,
    longitude: 126.976,
    requestedAt: new Date().toISOString(),
  },
  {
    number: 3,
    bikeCount: 2,
    latitude: 37.568,
    longitude: 126.979,
    requestedAt: new Date().toISOString(),
  },
];

export const getNearbyStationsMock = http.get(
  "/api/stations/map/nearby",
  ({ request }) => {
    const url = new URL(request.url);
    const latitude = url.searchParams.get("latitude");
    const longitude = url.searchParams.get("longitude");

    console.log("msw:get :: /api/stations/map/nearby", {
      latitude,
      longitude,
    });

    return HttpResponse.json<Station[]>(MOCK_STATIONS);
  }
);
