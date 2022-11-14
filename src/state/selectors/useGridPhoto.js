import atoms, { createSelectorFamilyHook } from "../store";
import isNil from "lodash/isNil";
import getEmptyGridCells from "../getEmptyGridCells";

const {
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
			const [cellId] = getEmptyGridCells([photo], get);

			if (cellId) {
				set(gridPhotos(cellId), photo);
			}
		}

		if (options.orgCellId && !options.copy) {
			//remove the photo from the original cell
			reset(gridPhotos(options.orgCellId));
		}
	},
});

export default useGridPhoto;
