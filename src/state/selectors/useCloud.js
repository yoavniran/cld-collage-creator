import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	cloud
} = atoms;

const useCloud = createSelectorHook(cloud);

export default useCloud;
