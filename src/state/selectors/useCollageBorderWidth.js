import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	borderWidth
} = atoms;

const useCollageBorderWidth = createSelectorHook(borderWidth);

export default useCollageBorderWidth;
