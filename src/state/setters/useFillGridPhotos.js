import { NOTIFICATION_TYPES } from "../../consts";
import { getTrackerForAtom } from "../../recoilUtils/recoil-spring";
import atoms, { createTransactionHookSetter } from "../store";
import getEmptyGridCells from "../getEmptyGridCells";

const {
	gridPhotos,
	notifications,
	photos: photosAtom,
} = atoms;

const photosTrackerAtom = getTrackerForAtom(photosAtom, atoms);

const useFillGridPhotos = createTransactionHookSetter({
	setter: (
		{ get, set },
		config,
	) => {
		set(notifications, (prev) => [{
			type: NOTIFICATION_TYPES.FILL_GRID,
			severity: "info",
			message: "Filling empty grid cells",
		}, ...prev]);

		const photosTracker = get(photosTrackerAtom);
		const assets = config?.assets?.map(({ public_id, filename, secure_url }) => ({
			cldId: public_id,
			url: secure_url,
			name: filename,
		})) || [];
		const photos = assets.concat(photosTracker.map((index) => get(photosAtom(index))));
		const emptyCells = getEmptyGridCells(photos, get);

		if (emptyCells.length) {
			emptyCells.forEach((id, index) => {
				set(gridPhotos(id), photos[index]);
			});
		}
	},
});

export default useFillGridPhotos;
