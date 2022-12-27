import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	uploadPreset,
} = atoms;

const useUploadPreset = createSelectorHook(uploadPreset);

export default useUploadPreset;
