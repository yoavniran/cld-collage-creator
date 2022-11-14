import isEmpty from "lodash/isEmpty";
import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";
import useAllCellsSet from "./useAllCellsSet";

const {
	cloud,
	collagePreset,
} = atoms;

const useCanGenerate = createSelectorHook(
	"CanGenerateSelector",
	(get) => {
		const checks = [
			{ text: "Set cloud name (menu)" , status: !isEmpty(get(cloud)) },
			{ text: "Set collage preset (menu)" , status: !isEmpty(get(collagePreset)) },
			{ text: "Set a photo for every cells (grid)" , status: (get(useAllCellsSet.selector)) },
		];

		return {
			result: checks.every(({ status }) => status),
			checks,
		};
	}
);

export default useCanGenerate;
