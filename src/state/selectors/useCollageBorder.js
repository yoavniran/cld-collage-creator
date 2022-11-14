import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	borderWidth,
	borderColor,
} = atoms;

const useCollageBorder = createSelectorHook(
	"CollageBorderSelector",
	(get) => [get(borderColor), get(borderWidth)],
);

export default useCollageBorder;
