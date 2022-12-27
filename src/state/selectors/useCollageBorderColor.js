import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	borderColor
} = atoms;

const useCollageBorderColor = createSelectorHook(borderColor);

export default useCollageBorderColor;
