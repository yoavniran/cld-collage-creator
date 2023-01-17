import faunadb from "faunadb";
import { createResponse, ERROR_RESPONSE, INVALID_REQ_RESPONSE } from "../common.mjs";

const handler = async (event) => {
	let response, client;

	try {
		const { rid } = event.queryStringParameters;

		if (event.httpMethod === "GET" && rid) {
			const q = faunadb.query;
			client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

			const dbResult = await client.query(
				q.Get(
					q.Match(q.Index("collage-index"), rid),
				),
			);

			console.log(`GOT RESULT FOR RID = ${rid}= `, dbResult);

			response = {
				statusCode: 200,
				body: {
					success: !!dbResult,
					data: dbResult?.data,
				}
			};
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

