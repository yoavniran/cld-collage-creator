const addUrlTransformation = (url, transformation) => {
	return url.replace("/image/upload/", transformation);
};

export default addUrlTransformation;
