import { NOTIFICATION_TYPES } from "../../consts";
import { createTransactionHookSetter } from "../../recoilUtils";
import atoms, { DEFAULTS } from "../store";
import calculateCells from "../cellsCalculator";

const {
	gridSize,
	borderColor,
	borderWidth,
	gridCells,
	lastOverride,
	photos,
	notifications,
} = atoms;

const useCollageReset = createTransactionHookSetter((
	{ set, reset },
) => {
	reset(gridSize);
	reset(borderColor);
	reset(borderWidth);
	reset(gridCells);
	reset(lastOverride);
	reset(photos);

	set(gridCells,
		calculateCells(DEFAULTS.gridSize));

	set(notifications, (prev) => [{
		type: NOTIFICATION_TYPES.COLLAGE_RESET,
		severity: "info",
		message: "Collage was reset",
	}, ...prev]);
});

export default useCollageReset;
