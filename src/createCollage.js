import { logger, request } from "./utils";

const createCollage = async (id,
	{
		cloud,
		preset,
		template,
		assets,
		width,
		height,
		columns,
		rows,
		spacing,
		color,
		crop,
		gravity,
	}) => {


	const manifest = {
		template,
		width,
		height,
		columns,
		rows,
		spacing,
		color,
		assetDefaults: { kind: "upload", crop, gravity },
		assets: Object.values(assets).map((id) => ({ media: id })),
	};

	logger.log("SENDING COLLAGE REQUEST !!!!!!!!", { id, manifest, assets });

	let result;

	try {
		const fd = new FormData();
		fd.append("upload_preset", preset);

		//TODO: Allow setting public id (save-as)

		fd.append("public_id", id);
		fd.append("manifest_json", JSON.stringify(manifest));

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
