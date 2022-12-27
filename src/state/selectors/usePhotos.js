import { createFamilyTrackerSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	photos,
} = atoms;

const usePhotos = createFamilyTrackerSelectorHook(photos);

export default usePhotos;
