import { createTransactionHookSetter } from "../../recoilUtils";
import { NOTIFICATION_TYPES } from "../../consts";
import { getTrackerForAtom } from "../../recoilUtils/recoil-spring";
import atoms from "../store";
import fillEmptyGridCells from "../fillEmptyGridCells";

const {
	notifications,
	photos: photosAtom,
} = atoms;

const gridPhotosTracker = getTrackerForAtom(photosAtom, atoms);

const useFillGridPhotos = createTransactionHookSetter((
	{ get, set },
) => {
	const photosIndex = get(gridPhotosTracker);
	const photos = photosIndex.map((index) => get(photosAtom(index)));

	set(notifications, (prev) => [{
		type: NOTIFICATION_TYPES.FILL_GRID,
		severity: "info",
		message: "Filling empty grid cells",
	}, ...prev]);

	fillEmptyGridCells(photos, get, set);
});

export default useFillGridPhotos;
