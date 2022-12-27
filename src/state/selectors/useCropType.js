import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	crop
} = atoms;

const useCropType = createSelectorHook(crop);

export default useCropType;
