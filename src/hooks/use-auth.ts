import { getAccessToken, subscribeToToken } from "@/utils/http";
import { useSyncExternalStore } from "react";

export function useAuth() {
	const token = useSyncExternalStore(
		subscribeToToken,
		getAccessToken,
		getAccessToken,
	);

	return {
		isLoggedIn: !!token,
		token,
	};
}
