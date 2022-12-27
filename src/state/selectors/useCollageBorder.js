import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	borderWidth,
	borderColor,
} = atoms;

const useCollageBorder = createSelectorHook(
	"CollageBorderSelector",
	(get) => [get(borderColor), get(borderWidth)],
);

export default useCollageBorder;
