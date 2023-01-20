import isString from "lodash/isString";

const CORS_HEADERS = {
	"Access-Control-Allow-Headers": "Content-Type",
	"access-control-allow-origin": "*",
};

export const INVALID_REQ_RESPONSE = {
	statusCode: 400,
	body: "invalid request",
};

export const ERROR_RESPONSE = {
	statusCode: 500,
	body: "system error",
};

export const createResponse = (res) => ({
		...res,
		body: isString(res.body) ?
			res.body :
			JSON.stringify(res.body),
	});

export const createCorsResponse = (res) =>
	createResponse({
		...res,
		headers: {
			...CORS_HEADERS,
			...res.headers,
		}
	})
