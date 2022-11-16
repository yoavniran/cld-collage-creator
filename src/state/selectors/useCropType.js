import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	crop
} = atoms;

const useCropType = createSelectorHook(
	"CropSelector",
	crop,
);

export default useCropType;
