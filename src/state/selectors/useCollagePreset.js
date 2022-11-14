import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	collagePreset,
} = atoms;

const useCollagePreset = createSelectorHook(
	"CollagePresetSelector",
	collagePreset,
);

export default useCollagePreset;
