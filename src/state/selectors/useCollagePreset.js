import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	collagePreset,
} = atoms;

const useCollagePreset = createSelectorHook(collagePreset);

export default useCollagePreset;
