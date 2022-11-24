import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	isMonochromeGrid,
} = atoms;

const useIsMonochromeGrid = createSelectorHook(
	"IsMonochromeGridSelector",
	isMonochromeGrid,
	false,
);

export default useIsMonochromeGrid;

