import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	gravity
} = atoms;

const useGravityType = createSelectorHook(gravity);

export default useGravityType;
