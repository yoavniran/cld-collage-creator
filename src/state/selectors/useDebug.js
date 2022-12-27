import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	isDebug
} = atoms;

const useDebug = createSelectorHook(isDebug);

export default useDebug;
