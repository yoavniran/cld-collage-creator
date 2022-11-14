import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	borderColor
} = atoms;

const useCollageBorderColor = createSelectorHook(
	"CollageBorderColorSelector",
	borderColor,
);

export default useCollageBorderColor;
