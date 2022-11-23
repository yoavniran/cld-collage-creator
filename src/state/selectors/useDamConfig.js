import { logger } from "../../utils";
import { createSelectorHook } from "../../recoilUtils";
import atoms from "../store";

const { damConfig } = atoms;

const useDamConfig = createSelectorHook(
	"DamConfigSelector",
	async (get) => {
		const resolved = await get(damConfig);
		logger.log("resolved DAM config - ", resolved);
		return resolved;
	},
	false,
);

export default useDamConfig;
