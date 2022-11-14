const request = (url, data)=> {
	const req = new XMLHttpRequest();

	const pXhr = new Promise((resolve, reject) => {
		req.onerror = () => reject(req);
		req.ontimeout = () => reject(req);
		req.onabort = () => reject(req);
		req.onload = () => resolve(req);

		req.open("POST", url);

		req.setRequestHeader("Content-Type", "application/json");

		req.send(data);
	});

	pXhr.xhr = req;
	return pXhr;
};

export default request;
