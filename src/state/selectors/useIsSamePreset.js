import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	isSamePreset,
} = atoms;

const useIsSamePreset = createSelectorHook(
	"IsSamePresetSelector",
	isSamePreset,
);

export default useIsSamePreset;
