import isEmpty from "lodash/isEmpty";
import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	cloud,
	uploadPreset,
	collagePreset,
	isSamePreset,
} = atoms;

const useUploadDetails = createSelectorHook(
	"UploadDetailsSelector",
	(get) => {
		let details = null;
		const cloudVal = get(cloud);

		if (!isEmpty(cloudVal)) {
			const isSamePresetVal = get(isSamePreset),
			preset = isSamePresetVal ? get(collagePreset) : get(uploadPreset);

			if (!isEmpty(preset)) {
				details = {
					cloud: cloudVal,
					preset,
				};
			}
		}

		return details;
	}
);

export default useUploadDetails;
