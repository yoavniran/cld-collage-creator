import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	gravity
} = atoms;

const useGravityType = createSelectorHook(
	"GravityTypeSelector",
	gravity,
);

export default useGravityType;
