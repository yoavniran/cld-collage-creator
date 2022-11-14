import { NOTIFICATION_TYPES } from "../../consts";
import { getTrackerForAtom } from "../../recoilUtils/recoil-spring";
import atoms, { createTransactionHookSetter } from "../store";
import getEmptyGridCells from "../getEmptyGridCells";

const {
	gridPhotos,
	notifications,
	photos: photosAtom,
} = atoms;

const gridPhotosTracker = getTrackerForAtom(photosAtom, atoms);

const useFillGridPhotos = createTransactionHookSetter({ setter: (
	{ get, set },
) => {
	const photosIndex = get(gridPhotosTracker);
	const photos = photosIndex.map((index) => get(photosAtom(index)));

	set(notifications, (prev) => [{
		type: NOTIFICATION_TYPES.FILL_GRID,
		severity: "info",
		message: "Filling empty grid cells",
	}, ...prev]);

	const emptyCells = getEmptyGridCells(photos, get);

	if (emptyCells.length) {
		emptyCells.forEach((id, index) => {
			set(gridPhotos(id), photos[index]);
		});
	}
} });

export default useFillGridPhotos;
