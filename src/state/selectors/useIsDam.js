import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const { isDam } = atoms;

const useIsDam = createSelectorHook(isDam, false);

export default useIsDam;
