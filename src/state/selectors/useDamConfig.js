import { createSelectorHook } from "../../recoilUtils";
import atoms from "../store";

const { damConfig } = atoms;

const useDamConfig = createSelectorHook(
	"DamConfigSelector",
	async (get) => await get(damConfig),
	false,
);

export default useDamConfig;
