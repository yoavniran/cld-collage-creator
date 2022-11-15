import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	isDebug
} = atoms;

const useDebug = createSelectorHook(
	"IsDebugSelector",
	isDebug
);

export default useDebug;
