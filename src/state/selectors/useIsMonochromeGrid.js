import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	isMonochromeGrid,
} = atoms;

const useIsMonochromeGrid = createSelectorHook(isMonochromeGrid, false);

export default useIsMonochromeGrid;

