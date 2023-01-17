import isString from "lodash/isString";

export const INVALID_REQ_RESPONSE = {
	statusCode: 400,
	body: "invalid request",
};

export const ERROR_RESPONSE = {
	statusCode: 500,
	body: "system error",
};

export const createResponse = (res) => {
	return {
		...res,
		body: isString(res.body) ?
			res.body :
			JSON.stringify(res.body),
	};
};
