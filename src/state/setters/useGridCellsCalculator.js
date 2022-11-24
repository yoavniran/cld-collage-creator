import isBoolean from "lodash/isBoolean";
import { logger } from "../../utils";
import atoms, { createTransactionHookSetter } from "../store";
import calculateCells, { getCellMapFromGrid } from "../cellsCalculator";

const {
	gridSize,
	gridCells,
	lastOverride,
	notifications,
	isMonochromeGrid,
} = atoms;

const getIsNewOverrideValid = (override, { source, rows, cols, selectedIds }) => {
	return override.selectedIds.includes(source) &&
		(rows * cols) === (selectedIds.length + 1);
};

const calculateOverrideDetails = ({ selectedIds }, cells) => {
	const cellMap = getCellMapFromGrid(cells);

	const mergedIds = selectedIds.map((id) => {
		return [id, ...cellMap[id].overrideTargets];
	}).flat();

	const { min, max } = mergedIds.reduce((res, cellId) => {
		res.min = [
			Math.min(res.min[0], cellMap[cellId].position[0]),
			Math.min(res.min[1], cellMap[cellId].position[1]),
		];

		res.max = [
			Math.max(res.max[0], cellMap[cellId].position[0]),
			Math.max(res.max[1], cellMap[cellId].position[1]),
		];

		return res;
	}, { min: [Infinity, Infinity], max: [0, 0] });

	const source = cells[min[0]][min[1]].id;

	return {
		source,
		selectedIds: mergedIds.filter((id) => id !== source),
		rows: max[0] - min[0] + 1,
		cols: max[1] - min[1] + 1,
	};
};

const useGridCellsCalculator = createTransactionHookSetter({
	setter: (
		{ get, set },
		{ size, override, monochrome },
	) => {
		const isMonochromeSet = isBoolean(monochrome),
			prevMonochrome = get(isMonochromeGrid),
			isDifferentMonochrome = isMonochromeSet && monochrome !== prevMonochrome;

		if (size || override || isDifferentMonochrome) {
			let canCalculate = true;
			const prevSize = get(gridSize),
				prevCells = get(gridCells);

			logger.log("RUNNING GRID CELL CALCULATOR TRANSACTION", {
				prevSize,
				prevCells,
				size,
				override,
				prevMonochrome,
				monochrome,
				isDifferentMonochrome,
			});

			if (size && size !== prevSize) {
				set(gridSize, size);
			}

			if (isDifferentMonochrome) {
				set(isMonochromeGrid, monochrome);
			}

			let overrideDetails;

			if (override && !override.unmerge && prevCells) {
				overrideDetails = calculateOverrideDetails(override, prevCells);
				canCalculate = getIsNewOverrideValid(override, overrideDetails);

				if (!canCalculate) {
					set(notifications, (prev) => [{
						type: "invalid-override",
						severity: "error",
						message: "Invalid selection!",
					}, ...prev]);
				}
			}

			if (canCalculate) {
				if (override) {
					set(lastOverride, override);
				}

				const detailedOverride = override && { ...override, ...overrideDetails };

				const newCells = calculateCells({
					size: size || prevSize,
					isMonochrome: isMonochromeSet ? monochrome : prevMonochrome,
					override: detailedOverride,
					prevCells,
				});

				set(gridCells, newCells);
			}
		}
	},
});

export default useGridCellsCalculator;
