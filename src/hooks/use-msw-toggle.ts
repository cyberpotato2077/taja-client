import { getMSWState, setMSWState } from "@/utils/msw-toggle";
import { useEffect, useState } from "react";

export function useMSWToggle() {
	const [isEnabled, setIsEnabled] = useState(getMSWState());

	useEffect(() => {
		setIsEnabled(getMSWState());
	}, []);

	const toggleMSW = async (enabled: boolean) => {
		setMSWState(enabled);
		setIsEnabled(enabled);

		if (enabled) {
			try {
				const { worker } = await import("@/mocks/browser");
				await worker.start({
					serviceWorker: {
						url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
					},
					onUnhandledRequest: "bypass",
				});
			} catch (error) {
				console.error("Failed to start MSW:", error);
				setMSWState(false);
				setIsEnabled(false);
			}
		} else {
			try {
				const { worker } = await import("@/mocks/browser");
				await worker.stop();
			} catch (error) {
				console.error("Failed to stop MSW:", error);
				setMSWState(true);
				setIsEnabled(true);
			}
		}
	};

	return { isEnabled, toggleMSW };
}
