import atoms, { createSelectorFamilyHook } from "../store";
import isNil from "lodash/isNil";
import fillEmptyGridCells from "../fillEmptyGridCells";

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
			fillEmptyGridCells([photo]), get, set);
		}

		if (options.orgCellId && !options.copy) {
			//remove the photo from the original cell
			reset(gridPhotos(options.orgCellId));
		}
	},
});

export default useGridPhoto;
