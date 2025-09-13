import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";

export function StationMarkers() {
	const { data } = useQuery({
		queryKey: ["stations"],
		queryFn: () => http.get("/stations/map/nearby"),
	});

	console.log(data);

	return <></>;
}
