import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	isGenerating
} = atoms;

const useGenerating = createSelectorHook(
	"GeneratingSelector",
	isGenerating,
	false,
);

export default useGenerating;
