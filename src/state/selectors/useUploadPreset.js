import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	uploadPreset,
} = atoms;

const useUploadPreset = createSelectorHook(
	"UploadPresetSelector",
	uploadPreset,
);

export default useUploadPreset;
