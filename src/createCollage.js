import { WEBHOOK_URL_BASE } from "./consts";
import { logger, request } from "./utils";

const CREATE_URL = `${WEBHOOK_URL_BASE}collageCreate`;

const createCollage = async (id, manifest, cloud, preset) => {
	let result;

	try {
		// const fd = new FormData();
		//
		// fd.append("upload_preset", preset);
		// fd.append("public_id", id);
		// fd.append("manifest_json", JSON.stringify(manifest));

		logger.log("SENDING COLLAGE REQUEST !!!!!!!!", {
			id,
			manifest,
			cloud,
			preset,
		});

		const response = await request(
			//`https://api.cloudinary.com/v1_1/${cloud}/image/create_collage`,
			// fd,
			CREATE_URL,
			JSON.stringify({
				id,
				cloud,
				preset,
				manifest,
			}),
		);

		logger.log("!!!!!!!!!!!!!! CREATE RESPONSE !!!!!!!!!! ", response);

		result = response.serverResponse ;
	} catch (ex) {
		console.error(ex);
		result = { success: false, result: "error", message: ex.message };
	}

	return result;
};

export default createCollage;
