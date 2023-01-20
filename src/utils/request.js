import isString from "lodash/isString";
import logger from "./logger";

const SUCCESS_STATUSES = [200, 201];

const throwError = (status, statusText) => {
	throw new Error(`Request Failed! status = ${status}, text = ${statusText}`);
};

const requestGet = (url) =>
	request(url, null, true, "GET");

const request = (url, data, cors = true, method = "POST") => {
	const headers = new Headers();

	if (isString(data)) {
		headers.set("Content-Type", "application/json");
	}

	return fetch(url, {
		method,
		body: data,
		mode: cors ? "cors" : undefined,
		headers,
	})
		.then((response) => {
			const { status, statusText } = response;
			logger.log("REQUEST RESPONSE", { status, statusText });
			return SUCCESS_STATUSES.includes(status) ?
				response.json()
					.then((jsonRes) => ({ jsonRes, response })) :
				throwError(status, statusText);
		})
		.then(({ jsonRes, response }) => {
			logger.log("SERVER RESPONSE !!!!! ", jsonRes);
			return {
				success: true,
				serverResponse: jsonRes,
				headers: response.headers,
			};
		})
		.catch((ex) => {
			return {
				success: false,
				error: ex,
			};
		});
	// const req = new XMLHttpRequest();
	//
	// const pXhr = new Promise((resolve, reject) => {
	// 	req.onerror = () => reject(req);
	// 	req.ontimeout = () => reject(req);
	// 	req.onabort = () => reject(req);
	// 	req.onload = () => resolve(req);
	//
	// 	req.open("POST", url);
	//
	// 	req.setRequestHeader("Content-Type", "application/json");
	//
	// 	req.send(data);
	// });
	//
	// pXhr.xhr = req;
	// return pXhr;
};

export {
	request,
	requestGet,
};
