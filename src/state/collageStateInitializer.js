import atoms, { DEFAULTS } from "./store";
import calculateCells from "./cellsCalculator";

const {
	gridCells,
	damConfig,
} = atoms;

const collageStateInitializer = (data, set) => {
	const size = data?.gridSize || DEFAULTS.gridSize;
	set(gridCells, calculateCells(size));

	if ("cloudinary" in window) {
		const cldConfig = window.cloudinary?.customAction?.getConfig();

		// console.log("CLD CONFIG !!! ", cldConfig);
		set(damConfig, cldConfig);
	}
};

export default collageStateInitializer;
