export function getOperation() {
	// 주소가 localhost 라면
	if (window.location.hostname === "localhost") {
		return "local";
	}
	return "live";
}
