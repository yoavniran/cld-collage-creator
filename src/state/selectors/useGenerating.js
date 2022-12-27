import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	isGenerating
} = atoms;

const useGenerating = createSelectorHook(isGenerating, false);

export default useGenerating;
