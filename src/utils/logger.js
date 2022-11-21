const LOG_METHODS = ["log", "table"];

const createLogger = () => {
	let isDebug = false;

	const setDebug = (debug) => {
		isDebug = !!debug;
	};

	const getMethods = () =>
		LOG_METHODS.reduce((res, m) => {
			res[m] = (...args) => {
				if (isDebug) {
					console[m](...args);
				}
			};

			return res;
		}, {});

	return {
		setDebug,
		...getMethods(),
	};
};

export default createLogger();
