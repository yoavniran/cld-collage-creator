import atoms from "./store";

const {
	gridCells,
	gridPhotos,
} = atoms;

const fillEmptyGridCells = (photos, get, set) => {
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

	emptyCells.forEach((id, index) => {
		set(gridPhotos(id), photos[index]);
	});
};

export default fillEmptyGridCells;
