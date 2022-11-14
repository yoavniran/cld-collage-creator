const useRecoilLocalStorageInitializer = ({ lsKey, spring, customInitializer } = {}) => {
	const { atoms, metadata } = spring;

	return ({ set }) => {
		let data;

		try {
			const dataStr = localStorage.getItem(lsKey);

			if (dataStr) {
				data = JSON.parse(dataStr);
			}
		} catch (ex) {
			console.warn("FAILED TO READ CCC DATA FROM LS", ex);
		}

		if (data) {
			Object.entries(data)
				.forEach(([key, value]) => {
					if (atoms[key]) {
						if (metadata[key].isFamily) {
							//set atom family members correctly
							Object.entries(value)
								.forEach(([param, member]) => {
									set(atoms[key](param), member);
								});
						} else {
							set(atoms[key], value);
						}
					}
				});
		}

		if (customInitializer) {
			customInitializer(data, set);
		}
	};
};

export default useRecoilLocalStorageInitializer;
