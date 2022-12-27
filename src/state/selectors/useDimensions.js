import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	width,
	height,
} = atoms;

const useDimensions = createSelectorHook(width,
	(newVal, { set }) => {
		set(width, newVal);
		set(height, newVal);
	},
);

export default useDimensions;
