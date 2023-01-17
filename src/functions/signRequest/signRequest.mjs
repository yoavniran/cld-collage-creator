import crypto from "crypto";

// var crypto = require('crypto');
// const hash = crypto.createHash('sha256').update(input).digest('base64');

const handler = async (event) => {
	let response;

	if (event.httpMethod === "POST") {

		console.log(event.body);


		const timestamp = Date.now();

		const params = []
			.concat(timestamp)
			.join("&");

		const hash = crypto
			.createHash("sha256")
			.update(`input`)
			.digest("base64");

		response = {
			statusCode: 200,
	signature,
		};
	} else {
		response = {
			statusCode: 400,
			body: "Invalid request"
		};
	}

	return response;
};

export {
	handler,
};
