import { createSelectorFamilyHook } from "recoil-spring";
import atoms from "../store";

const {
	collages
} = atoms;

const useReadyCollage = createSelectorFamilyHook(
	collages,
	false
);

export default useReadyCollage;
