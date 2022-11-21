const request = (url, data, cors = true) => {
	return fetch(url, {
		method: "POST",
		body: data,
		mode: cors ? "cors" : undefined,
	}).then(({ json, status, statusText }) => {
		console.log("REQUEST RESPONSE", { status, statusText });
		return json.then((jsonRes) => {
			console.log("JSON RESPONSE !!!!! ", jsonRes);
			return {
				success: true,
				response: jsonRes,
			};
		});
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

export default request;
