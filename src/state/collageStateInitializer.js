import atoms, { DEFAULTS } from "./store";
import calculateCells from "./cellsCalculator";

const { gridCells } = atoms;

const collageStateInitializer = (data, set) => {
	const size = data?.gridSize || DEFAULTS.gridSize;
	set(gridCells, calculateCells(size));
};

export default collageStateInitializer;
