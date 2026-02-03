import { http, HttpResponse } from "msw";

export const readStationFileMock = http.post(
	"/api/stations/upload",
	async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (file) {
			return HttpResponse.json<string>("Station file uploaded successfully");
		}

		return HttpResponse.json({ error: "No file provided" }, { status: 400 });
	},
);
