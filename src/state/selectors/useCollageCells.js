import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	gridCells,
} = atoms;

const useCollageCells = createSelectorHook(
	"CollageCellsSelector",
	gridCells,
	false
);

export default useCollageCells;
