import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	cloudEntryMode
} = atoms;

const useCloudEntryMode = createSelectorHook(cloudEntryMode, false);

export default useCloudEntryMode;
