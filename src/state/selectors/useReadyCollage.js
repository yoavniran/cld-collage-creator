import { createSelectorFamilyHook } from "recoil-spring";
import atoms from "../store";

const {
	collages
} = atoms;

const useReadyCollage = createSelectorFamilyHook(
	collages,
	(param, newValue, { reset }) => {
		reset(collages(param));
	}
);

export default useReadyCollage;
