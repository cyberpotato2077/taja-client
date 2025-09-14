import { API_KEY } from "@/constants/maps";
import { APIProvider } from "@vis.gl/react-google-maps";
import type { ReactNode } from "react";

export function GoogleMapWrapper({ children }: { children: ReactNode }) {
	if (API_KEY == null) {
		return (
			<div className="w-full h-full flex items-center justify-center min-h-[100vh] bg-gradient-to-b from-gray-300 via-gray-100 via-70% to-white">
				apiKey를 찾지 못했습니다.
			</div>
		);
	}

	return <APIProvider apiKey={API_KEY}>{children}</APIProvider>;
}
