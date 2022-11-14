import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	cloud
} = atoms;

const useCloud = createSelectorHook(
	"CloudSelector",
	cloud,
);

export default useCloud;
