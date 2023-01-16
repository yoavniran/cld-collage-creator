import faunadb from "faunadb";


// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
	try {
		// const subject = event.queryStringParameters.name || "World";

		console.log("RECEIVED REQUEST - METHOD = ", event.httpMethod);
		console.log("RECEIVED REQUEST - BODY = ", event.body);
		console.log("RECEIVED REQUEST - PARAMS = ", event.queryStringParameters);

		const q = faunadb.query;
		const client = new faunadb.Client({
			secret: process.env.FAUNADB_SECRET,
			// keepAlive: false,
		});

		const createP = client.query(
			q.Create(
				q.Collection("collages"),
				{
					data: {
						id: Date.now(),
						publicId: "bob123",
					},
				},
			),
		);

		const response = await createP;

		console.log("CREATE RESPONSE !!! ", response);


		return {
			statusCode: 200,
			body: JSON.stringify({
				hasSecret: !!process.env.FAUNADB_SECRET,
				dbRef: response.ref,
			}),
			// // more keys you can return:
			// headers: { "headerName": "headerValue", ... },
			// isBase64Encoded: true,
		};
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};

export {
	handler,
};
