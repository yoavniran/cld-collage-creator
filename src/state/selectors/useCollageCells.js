import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	gridCells,
} = atoms;

const useCollageCells = createSelectorHook(gridCells,	false);

export default useCollageCells;
