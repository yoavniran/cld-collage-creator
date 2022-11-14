import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	borderWidth
} = atoms;

const useCollageBorderWidth = createSelectorHook(
	"CollageBorderWidthSelector",
	borderWidth,
);

export default useCollageBorderWidth;
