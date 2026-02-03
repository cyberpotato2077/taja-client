import { http, HttpResponse } from "msw";

export const readDistrictPointFileMock = http.post(
	"/api/weather/district/upload",
	async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (file) {
			return HttpResponse.json<string>(
				"District point file uploaded successfully",
			);
		}

		return HttpResponse.json({ error: "No file provided" }, { status: 400 });
	},
);
