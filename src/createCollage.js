import { logger, request } from "./utils";

const createCollage = async (id, manifest, cloud, preset) => {
	let result;

	try {
		const fd = new FormData();

		fd.append("upload_preset", preset);
		fd.append("public_id", id);
		fd.append("manifest_json", JSON.stringify(manifest));

		logger.log("SENDING COLLAGE REQUEST !!!!!!!!", { id, manifest, cloud, preset });

		const response = await request(
			`https://api.cloudinary.com/v1_1/${cloud}/image/create_collage`,
			fd,
		);

		logger.log("!!!!!!!!!!!!!! CREATE RESPONSE !!!!!!!!!! ", response);

		result = { success: response.success, id };
	} catch (ex) {
		console.error(ex);
		result = { result: "error", message: ex.message };
	}

	return result;
};

export default createCollage;
