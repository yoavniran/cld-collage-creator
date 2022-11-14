import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	gridSize
} = atoms;

const useCollageSize = createSelectorHook(
	"CollageSizeSelector",
	gridSize,
	false
);

export default useCollageSize;
