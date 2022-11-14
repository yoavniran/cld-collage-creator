import { request } from "./utils";

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

	console.log("SENDING COLLAGE REQUEST !!!!!!!!", { id, manifest, assets });

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


		// 	await request(
		// 	"http://localhost:4000/collage",
		// 	JSON.stringify({
		// 		cloud,
		// 		preset,
		// 		collage: {
		// 			id,
		// 			manifest,
		// 		}
		// 	})
		// );

		console.log("!!!!!!!!!!!!!! RESPONSE !!!!!!!!!! ", response);

		result = { result: "success", id };
	} catch (ex) {
		console.error(ex);
		result = { result: "error", message: ex.message };
	}

	return result;
};

export default createCollage;
