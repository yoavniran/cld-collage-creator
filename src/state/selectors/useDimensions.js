import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	width,
	height,
} = atoms;

const useDimensions = createSelectorHook(
	"DimensionsSelector",
	width,
	(newVal, { set }) => {
		set(width, newVal);
		set(height, newVal);
	},
);

export default useDimensions;
