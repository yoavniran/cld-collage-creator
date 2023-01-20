import faunadb from "faunadb";
import { createResponse, ERROR_RESPONSE, INVALID_REQ_RESPONSE } from "../common.mjs";

const handler = async ({ httpMethod, body }) => {
	let response, client;

	try {
		if (httpMethod === "POST") {
			const data = JSON.parse(body);

			if (data.request_id && data.secure_url) {
				const id = data.request_id;
				const q = faunadb.query;
				client = new faunadb.Client({
					secret: process.env.FAUNADB_SECRET,
					// keepAlive: false,
				});

				console.log(" -- creating DB entry for request ", { id, publicId: data.public_id });

				const createP = client.query(
					q.Create(
						q.Collection("collages"),
						{
							data: {
								id,
								...data,
							},
						},
					),
				);

				const dbResult = await createP;

				if (dbResult?.ref) {
					console.log(" -- DB entry created for request ", { id, publicId: data.public_id });
				}

				response = {
					statusCode: 200,
					body: { success: true },
				};
			} else {
				response = INVALID_REQ_RESPONSE;
			}
		} else {
			response = INVALID_REQ_RESPONSE;
		}
	} catch (ex) {
		console.error("ERROR OCCURRED", ex);
		response = ERROR_RESPONSE;
	} finally {
		client?.close();
	}

	return createResponse(response);
};

export {
	handler,
};
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
