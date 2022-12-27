import { createTransactionHook } from "recoil-spring";
import { NOTIFICATION_TYPES } from "../../consts";
import atoms, { DEFAULTS } from "../store";
import calculateCells from "../cellsCalculator";

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

const useCollageReset = createTransactionHook((
	{ get, set, reset, resetFamily },
) => {
	reset(gridSize);
	reset(borderColor);
	reset(borderWidth);
	reset(gridCells);
	reset(lastOverride);

	set(gridCells,
		calculateCells({ size: DEFAULTS.gridSize, isMonochrome: get(isMonochromeGrid) }));

	resetFamily(gridPhotos);

	set(notifications, (prev) => [{
		type: NOTIFICATION_TYPES.COLLAGE_RESET,
		severity: "info",
		message: "Collage was reset",
	}, ...prev]);
});

export default useCollageReset;
