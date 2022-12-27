import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	isAppDrawerOpen
} = atoms;

const useAppDrawerStatus = createSelectorHook(isAppDrawerOpen);

export default useAppDrawerStatus;
