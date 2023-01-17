import faunadb from "faunadb";

const INVALID_REQ_RESPONSE = { statusCode: 400, body: "invalid request" };

const handler = async (event) => {
	let response, client;

	try {
		const { rid } = event.queryStringParameters;

		if (event.httpMethod === "GET" && rid) {
			const q = faunadb.query;
			client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

			const dbResult = await client.query(
				q.Paginate(
					q.Match(q.Index("collage-index"), rid)
				));

			console.log(`GOT RESULT FOR RID = ${rid}= `, dbResult);
		} else {
			response = INVALID_REQ_RESPONSE;
		}
	} catch (ex) {
		console.error("ERROR OCCURRED", ex);
		response = { statusCode: 500, body: "system error" };
	} finally {
		client?.close();
	}

	return response;
};

export {
	handler,
};

