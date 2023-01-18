import { WEBHOOK_URL_BASE } from "./consts";
import { logger, request } from "./utils";

const NOTIFICATION_URL = `${WEBHOOK_URL_BASE}collageCreate`;

const createCollage = async (id, manifest, cloud, preset) => {
	let result;

	try {
		const fd = new FormData();

		fd.append("upload_preset", preset);
		fd.append("public_id", id);
		fd.append("manifest_json", JSON.stringify(manifest));
		// fd.append("notification_url", NOTIFICATION_URL);

		logger.log("SENDING COLLAGE REQUEST !!!!!!!!", { id, manifest, cloud, preset, NOTIFICATION_URL });

		const response = await request(
			`https://api.cloudinary.com/v1_1/${cloud}/image/create_collage`,
			fd,
		);

		logger.log("!!!!!!!!!!!!!! CREATE RESPONSE !!!!!!!!!! ", response);

		result = {
			success: response.success,
			requestId: response.success ? response.headers.get("request_id") : null,
			publicId: response.success ? response.serverResponse.public_id : null,
		};
	} catch (ex) {
		console.error(ex);
		result = { result: "error", message: ex.message };
	}

	return result;
};

export default createCollage;
