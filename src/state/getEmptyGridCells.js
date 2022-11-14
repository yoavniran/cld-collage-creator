import atoms from "./store";

const {
	gridCells,
	gridPhotos,
} = atoms;

const getEmptyGridCells = (photos, get) => {
	const cells = get(gridCells)
		.flat()
		.filter(({ override }) => override === null);

	const emptyCells = [];
	let lastCellIndx = 0, photoIndx = 0;

	while (photoIndx < photos.length &&
	lastCellIndx < cells.length) {
		if (!get(gridPhotos(cells[lastCellIndx++].id))) {
			emptyCells.push(cells[lastCellIndx - 1].id);
			photoIndx += 1;
		}
	}

	return emptyCells;
};

export default getEmptyGridCells;
