const MSW_TOGGLE_KEY = "msw-enabled";

export const getMSWState = (): boolean => {
	try {
		return localStorage.getItem(MSW_TOGGLE_KEY) === "true";
	} catch {
		return false;
	}
};

export const setMSWState = (enabled: boolean): void => {
	try {
		localStorage.setItem(MSW_TOGGLE_KEY, enabled.toString());
	} catch {
		console.warn("Failed to save MSW state to localStorage");
	}
};

export const isMSWEnabled = getMSWState();
