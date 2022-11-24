import { getColor, getMonochromeColor } from "../styles/colors";
import { logger } from "../utils";

/**
 * calculates cell's ID based on the cell position
 * that will not change if the grid size is increased or decreased
 * formula: Math.pow(Math.max(row, col), 2) + (Math.max(row, col) - col) + row
 * example: -----------------------------------------
 *          | 1(0,0)  | 2(0,1)  | 5(0,2)  | 10(0,3)  |
 *          -----------------------------------------
 *          | 4(1,0)  | 3(1,1) | 6(1,2)  | 11(1,3)  |
 *          -----------------------------------------
 *          | 9(2,0) | 8(2,1) | 7(2,2)  |  12(2,3)  |
 *          -----------------------------------------
 *          | 16(3,0) | 15(3,1) | 14(3,2) | 13(3,3) |
 *          -----------------------------------------
 * @param i (row)
 * @param j (column)
 */
const calculateCellId = (i, j) => {
	const size = Math.max(i, j);
	return Math.pow(size, 2) + size - j + i + 1;
};

const getColorForCell = (pos, isMono) =>
	isMono ? getMonochromeColor(pos) : getColor(pos);

const createNewCell = (i, j, isMonochrome) => {
	const position = [i, j];
	return {
		position,
		//unique id that doesnt change when grid is resized
		id: calculateCellId(i, j),
		//unique color
		color: getColorForCell(position, isMonochrome),
		//how many columns this cell should occupy (when its overriding other cells)
		columns: 1,
		//how many rows this cell should occupy (when its overriding other cells)
		rows: 1,
		//id of the cell overriding this one
		override: null,
		//ids of the cells being overridden by this one
		overrideTargets: [],
		//store flag if monochrome colors or not
		isMonochrome,
	};
};

const getMergedGradient = (cell, cellMap, isMonochrome) => {
	const step = 100 / (cell.overrideTargets.length + 1);

	const gradients = cell.overrideTargets.map((targetId, index) => {
		const target = cellMap[targetId];
		return `${target.color} ${(index + 1) * step}%`;
	}).join(", ");

	const sourceColor = getColorForCell(cell.position, isMonochrome);

	return `linear-gradient(140deg, ${sourceColor} 0%, ${gradients})`;
};

const resetCellFromOverride = (cell, isMonochrome) => {
	cell.color = getColorForCell(cell.position, isMonochrome);
	cell.overrideTargets = [];
	cell.columns = 1;
	cell.rows = 1;
};

const resetCellOverriddenTargets = (cell, cellMap) => {
	cell.overrideTargets.forEach((targetId) => {
		if (cellMap[targetId]) {
			cellMap[targetId].override = null;
		}
	});
};

const updateCellsOverrides = (override, cellMap, isMonochrome) => {
	const source = cellMap[override.source];

	if (override.unmerge) {
		//clear overridden cells from the override
		resetCellOverriddenTargets(source, cellMap);
		resetCellFromOverride(source, isMonochrome);
	} else {
		source.overrideTargets = override.selectedIds;
		source.rows = override.rows;
		source.columns = override.cols;

		//clean up any existing overrides swallowed by this new override
		source.overrideTargets.forEach((targetId) => {
			const target = cellMap[targetId];
			resetCellFromOverride(target, isMonochrome);
			target.override = source.id;
		});

		//create gradient from the colors of the combined cells
		source.color = getMergedGradient(source, cellMap, isMonochrome);
	}
};

const getCellMapFromGrid = (cells, copy = false) => cells.flat()
	.reduce((res, cell) => {
		res[cell.id] = copy ? { ...cell } : cell;
		return res;
	}, {});

const unmergeOversizedOverrides = (cellMap, size, isMonochrome) => {
	Object.values(cellMap)
		.filter(({ overrideTargets }) => !!overrideTargets.length)
		.forEach((cell) => {
			if (cell.position[0] + cell.rows > size ||
				cell.position[1] + cell.columns > size) {
				resetCellOverriddenTargets(cell, cellMap);
				resetCellFromOverride(cell, isMonochrome);
			}
		});
};

const updateCellsColor = (cellMap, isMonochrome) => {
	//need to update the individual cells first
	Object.values(cellMap)
		.filter(({ overrideTargets }) => !overrideTargets.length)
		.forEach((cell) => {
			cell.color = getColorForCell(cell.position, isMonochrome);
			cell.isMonochrome = isMonochrome;
		});

	//after updating individual cells, its possible to update merged ones
	Object.values(cellMap)
		.filter(({ overrideTargets }) => !!overrideTargets.length)
		.forEach((cell) => {
			cell.color = getMergedGradient(cell, cellMap, isMonochrome);
			cell.isMonochrome = isMonochrome;
		});
};

const calculateCells = ({ size, isMonochrome, override = null, prevCells = null }) => {
	const newCells = [], cellMap = {};
	logger.log("** CALCULATING GRID CELLS ** ", { size, prevCells, override, isMonochrome });

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			newCells[i] = newCells[i] || [];

			const prevCell = prevCells?.[i]?.[j];
			const cell = prevCell ?
				//copy readonly cell from recoil store if already exists
				{ ...prevCell } :
				//create a new one cell (on first-time or resize)
				createNewCell(i, j, isMonochrome);

			cellMap[cell.id] = cell;
			newCells[i][j] = cell;
		}
	}

	if (prevCells && size < prevCells[0].length) {
		//grid was resized down
		unmergeOversizedOverrides(cellMap, size, isMonochrome);
	}

	if (newCells[0][0].isMonochrome !== isMonochrome) {
		//color scheme changed
		updateCellsColor(cellMap, isMonochrome);
	}

	if (override) {
		//override (cells merged) was set
		updateCellsOverrides(override, cellMap, isMonochrome);
	}

	return newCells;
};

export default calculateCells;

export {
	getCellMapFromGrid,
};
