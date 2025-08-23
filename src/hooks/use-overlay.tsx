import { overlay } from "overlay-kit";
import { useCallback, useEffect, useMemo, useRef } from "react";

const randonId = () => `overlay-kit-${Math.random().toString(36).slice(2, 11)}`;

export function useOverlay({ exitOnMount = true } = {}) {
	const overlayId = useRef(randonId());

	const open = useCallback((parameter: Parameters<typeof overlay.open>[0]) => {
		overlay.unmount(overlayId.current);
		return overlay.open(parameter, { overlayId: overlayId.current });
	}, []);

	const close = useCallback(() => {
		overlay.close(overlayId.current);
	}, []);

	const unmount = useCallback(() => {
		overlay.unmount(overlayId.current);
	}, []);

	useEffect(() => {
		return () => {
			if (exitOnMount) {
				overlay.unmount(overlayId.current);
			}
		};
	}, [exitOnMount]);

	return useMemo(() => ({ open, close, unmount }), [open, close, unmount]);
}
