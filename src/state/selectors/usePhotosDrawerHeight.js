import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	photosDrawerHeight
} = atoms;

const usePhotosDrawerHeight = createSelectorHook(
	"PhotosDrawerHeightSelector",
	photosDrawerHeight,
);

export default usePhotosDrawerHeight;
