import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	photosDrawerHeight
} = atoms;

const usePhotosDrawerHeight = createSelectorHook(photosDrawerHeight);

export default usePhotosDrawerHeight;
