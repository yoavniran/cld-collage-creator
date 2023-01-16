import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	isCloudLocked
} = atoms;

const useIsCloudLocked = createSelectorHook(isCloudLocked, false);

export default useIsCloudLocked;
