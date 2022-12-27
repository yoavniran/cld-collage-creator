import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	gridSize
} = atoms;

const useCollageSize = createSelectorHook(gridSize,	false);

export default useCollageSize;
