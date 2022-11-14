import atoms, { createSelectorFamilyHook } from "../store";
import isNil from "lodash/isNil";

const {
	gridCells,
	gridPhotos,
} = atoms;

const useGridPhoto = createSelectorFamilyHook({
	key: "GridPhotoFamilySelector",
	getter: gridPhotos,
	setter: (param, { photo, options = {} }, { set, reset, get }) => {
		if (photo === null) {
			reset(gridPhotos(param));
		} else if (!isNil(param)) {
			set(gridPhotos(param), photo);
		} else {
			//set photo in first empty cell
			//Would have been nice to do in a transaction but Recoil doesnt support selectors use :(
			const photos = [].concat(photo);
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
		}

		if (options.orgCellId && !options.copy) {
			//remove the photo from the original cell
			reset(gridPhotos(options.orgCellId));
		}
	},
});

export default useGridPhoto;
