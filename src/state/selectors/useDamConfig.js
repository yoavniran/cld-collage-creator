import { createSelectorHook } from "recoil-spring";
import { logger } from "../../utils";
import atoms from "../store";

const { damConfig } = atoms;

const useDamConfig = createSelectorHook(
	"DamConfigSelector",
	async (get) => {
		const resolved = await get(damConfig);
		logger.log("resolved DAM config - ", resolved);
		return resolved;
	},
);

export default useDamConfig;
