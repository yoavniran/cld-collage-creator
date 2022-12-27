import { createSelectorHook } from "recoil-spring";
import atoms from "../store";
import useCollageCells from "./useCollageCells";

const {
	gridPhotos
} = atoms;

const useAllCellsSet = createSelectorHook(
	"AllCellsSetSelector",
	(get, getCallback, getTracker) => {
		const trackedPhotos = getTracker(gridPhotos);
		const cells = get(useCollageCells.selector);

		return cells.flat()
			//filter our overridden cells
			.filter((cell) => !cell.override)
			//check that all cells that are overridden have a photo
			.every(({ id }) => trackedPhotos.includes(id));
	},
);

export default useAllCellsSet;

export const useAllCellsSetSelector  = useAllCellsSet.selector;
