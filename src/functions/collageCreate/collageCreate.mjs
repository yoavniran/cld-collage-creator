import faunadb from "faunadb";

const INVALID_REQ_RESPONSE = { statusCode: 400, body: "invalid request" };

const handler = async (event) => {
	let response, client;

	try {
		if (event.httpMethod === "POST") {
			const data = JSON.parse(event.body);

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
		response = { statusCode: 500, body: "system error" };
	} finally {
		client?.close();
	}

	return response;
};

export {
	handler,
};
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
