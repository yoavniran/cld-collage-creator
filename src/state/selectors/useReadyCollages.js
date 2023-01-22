import { createFamilyTrackerSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	collages,
} = atoms;

const useReadyCollages = createFamilyTrackerSelectorHook(collages);

export default useReadyCollages;
