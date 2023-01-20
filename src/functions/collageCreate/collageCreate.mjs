import fetch, { FormData } from "node-fetch";
import { createCorsResponse, ERROR_RESPONSE, INVALID_REQ_RESPONSE } from "../common.mjs";

const submitCreate = async (data) => {
	let result;

	console.log("CREATING COLLAGE WITH CLOUDINARY", data);
	const fd = new FormData();
	fd.append("upload_preset", data.preset);
	fd.append("public_id", data.id);
	fd.append("manifest_json", JSON.stringify(data.manifest));

	try {
		const response = await fetch(
			`https://api.cloudinary.com/v1_1/${data.cloud}/image/create_collage`,
			{ method: "POST", body: fd },
		);

		console.log(`GOT CLD RESPONSE ${response.status} - ${response.statusText}`);

		if (response.status === 200) {
			const requestId = response.headers.get("x-request-id");
			console.log("GOT CLD requestId HEADER ", requestId);

			if (requestId) {
				const json = await response.json();

				console.log("GOT CLD RESPONSE JSON ", json);

				return {
					error: false,
					data: {
						requestId,
						...json,
					},
				};
			}
		}
	} catch (ex) {
		console.log("ERROR CREATING COLLAGE WITH CLOUDINARY !", ex);
	}

	return result || { error: true };
};

const handler = async ({ httpMethod, body }) => {
	let response;

	try {
		if (httpMethod === "OPTIONS") {
			response = {
				statusCode: 200,
				body: "",
			};
		} else if (httpMethod === "POST") {
			const data = JSON.parse(body);
			const result = await submitCreate(data);
			const success = !result.error;

			response = {
				statusCode: 200,
				body: {
					success,
					...result.data,
				},
			};
		} else {
			response = INVALID_REQ_RESPONSE;
		}
	} catch (ex) {
		console.error("ERROR OCCURRED", ex);
		response = ERROR_RESPONSE;
	}

	return createCorsResponse(response);
};

export {
	handler,
};
