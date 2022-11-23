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
		const configPromise = window.cloudinary?.customAction?.getConfig();

		if (configPromise) {
			set(damConfig, configPromise);
		}
	}
	// else {
	// 	set(damConfig, new Promise((resolve) =>{
	// 		setTimeout(() => resolve({ test: true }), 2000);
	// 	}));
	// }
};

export default collageStateInitializer;
