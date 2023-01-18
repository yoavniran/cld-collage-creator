import faunadb from "faunadb";
import { createResponse, ERROR_RESPONSE, INVALID_REQ_RESPONSE } from "../common.mjs";

const handler = async (event) => {
	let response, client;

	try {
		const { rid } = event.queryStringParameters;

		if (event.httpMethod === "GET" && rid) {
			const q = faunadb.query;
			client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

			let dbResult;

			const rids = rid.split(",");

			try {
				dbResult = await client.query(
					q.Let({
							ids: rids,
						},
						q.Map(
							q.Var("ids"),
							q.Lambda(
								"id",
								q.Let({
										docRef: q.Match(q.Index("collage-index"), q.Var("id")),
									},
									q.If(
										q.Exists(q.Var("docRef")),
										q.Get(q.Var("docRef")),
										null,
									),
								),
							),
						),
					),
				);

				console.log(`GOT RESULT FOR RID = "${rid}"(${rids.length}) = `, !!dbResult);
			} catch (ex) {
				console.log(`Failed to find collage data for rid "${rid}"(${rids.length}) - db response code: ${ex.requestResult?.statusCode}`, ex.requestResult?.responseContent?.errors);
			}

			response = {
				statusCode: 200,
				body: {
					success: !!dbResult,
					data: dbResult.reduce((res, doc, index) => {
						res[rids[index]] = doc?.data || null;
						return res;
					}, {}),
				},
			};

			console.log("RETURNING RESPONSE BODY ", response.body);
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

