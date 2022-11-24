import atoms, { DEFAULTS } from "./store";
import calculateCells from "./cellsCalculator";

const {
	gridCells,
	damConfig,
} = atoms;

const collageStateInitializer = (data, set) => {
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
};

export default collageStateInitializer;
