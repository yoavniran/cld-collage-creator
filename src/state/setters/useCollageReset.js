import { NOTIFICATION_TYPES } from "../../consts";
import atoms, { DEFAULTS, createTransactionHookSetter } from "../store";
import calculateCells from "../cellsCalculator";
import { getTrackerForAtom } from "../../recoilUtils/recoil-spring";

const {
	gridSize,
	borderColor,
	borderWidth,
	gridCells,
	lastOverride,
	notifications,
	gridPhotos,
	isMonochromeGrid,
} = atoms;

const gridPhotosTracker = getTrackerForAtom(gridPhotos, atoms);

const useCollageReset = createTransactionHookSetter({ setter: (
	{ get, set, reset, resetFamily },
) => {
	reset(gridSize);
	reset(borderColor);
	reset(borderWidth);
	reset(gridCells);
	reset(lastOverride);

	set(gridCells,
		calculateCells({ size: DEFAULTS.gridSize, isMonochrome: get(isMonochromeGrid) }));

		resetFamily(gridPhotosTracker);

		set(notifications, (prev) => [{
			type: NOTIFICATION_TYPES.COLLAGE_RESET,
			severity: "info",
			message: "Collage was reset",
		}, ...prev]);
} });

export default useCollageReset;
