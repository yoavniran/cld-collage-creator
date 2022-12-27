import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	isSamePreset,
} = atoms;

const useIsSamePreset = createSelectorHook(isSamePreset);

export default useIsSamePreset;
