import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	isMockUpload
} = atoms;

const useMockUpload = createSelectorHook(isMockUpload);

export default useMockUpload;
