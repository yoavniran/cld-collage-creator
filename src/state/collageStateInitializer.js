import queryString from "query-string";
import { CLOUD_ENTRY_MODE } from "../consts";
import atoms, { DEFAULTS } from "./store";
import calculateCells from "./cellsCalculator";

const {
	gridCells,
	damConfig,
	isDam,
	cloud,
	collagePreset,
	uploadPreset,
	isSamePreset,
	cloudEntryMode,
} = atoms;

const getCloudEntryMode = (qs) =>
	Object.values(CLOUD_ENTRY_MODE)
		.includes(qs.cloudEntryMode) ?
		qs.cloudEntryMode :
		CLOUD_ENTRY_MODE.OPEN

const collageStateInitializer = (data, { set }) => {
	const size = data?.gridSize || DEFAULTS.gridSize;

	set(gridCells, calculateCells({
		size,
		isMonochrome: data?.isMonochromeGrid || DEFAULTS.isMonochromeGrid,
	}));

	if ("cloudinary" in window) {
		const configPromise = window.cloudinary?.customAction?.getConfig();

		if (configPromise) {
			set(damConfig, configPromise);
		}
	}

	//initialize UI based on optional query params
	const qs = queryString.parse(location.search);
	set(isDam, qs.dam === "true");
	set(cloud, qs.cloud ? qs.cloud : data.cloud);
	set(cloudEntryMode, getCloudEntryMode(qs));
	set(collagePreset, qs.collagePreset ? qs.collagePreset : data.collagePreset);
	set(uploadPreset, qs.uploadPreset ? qs.uploadPreset : data.uploadPreset);
	set(isSamePreset, qs.uploadPreset ? false : data.isSamePreset);
};

export default collageStateInitializer;
