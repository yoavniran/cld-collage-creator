import { createSelectorHook } from "../../recoilUtils";
import atoms from "../store";

const { isDam } = atoms;

const useIsDam = createSelectorHook(
	"IsDamSelector",
	(get) => get(isDam),
	false,
);

export default useIsDam;
