import atoms from "../store";
import { getTrackerForAtom } from "../../recoilUtils/recoil-spring";
import { createSelectorHook } from "../../recoilUtils";
import useCollageCells from "./useCollageCells";

const gridPhotosTracker = getTrackerForAtom(atoms.gridPhotos, atoms);

const useAllCellsSet = createSelectorHook(
	"AllCellsSetSelector",
	(get) => {
		const trackedPhotos = get(gridPhotosTracker);
		const cells = get(useCollageCells.selector);

		return cells.flat()
			//filter our overridden cells
			.filter((cell) => !cell.override)
			//check that all cells that are overridden have a photo
			.every(({ id }) => trackedPhotos.includes(id));
	},
);

export default useAllCellsSet;
