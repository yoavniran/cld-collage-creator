import { createSetterHook } from "recoil-spring";
import { logger } from "../../utils";
import { NOTIFICATION_TYPES } from "../../consts";
import createCollage from "../../createCollage";
import atoms from "../store";
import { collageManifestSelector } from "../selectors/useCollageManifest";

const {
	notifications,
	isGenerating,
	cloud: cloudAtom,
	collagePreset,
	pollingReqs,
} = atoms;

const useCollageGenerator = createSetterHook(
	async (
		{ get, set },
		params = {},
	) => {
		set(isGenerating, true);

		set(notifications, (prev) => [{
			type: NOTIFICATION_TYPES.COLLAGE_GENERATE,
			severity: "info",
			message: "Creating your Cloudinary Collage",
		}, ...prev]);

		const cloud = get(cloudAtom),
			preset = get(collagePreset),
			manifest = get(collageManifestSelector);

		logger.log("generating ..... ", { manifest, params, cloud, preset });

		const result = await createCollage(
			params.id || Date.now().toString(),
			manifest,
			cloud,
			preset,
		);

		logger.log("GOT GENERATE RESULT !!! ", result);

		set(isGenerating, false);

		if (result.success) {
			set(notifications, (prev) => [{
				type: NOTIFICATION_TYPES.COLLAGE_GENERATE_SUCCESS,
				severity: "success",
				message: "Collage request was sent successfully",
			}, ...prev]);

			const { requestId, public_id: publicId } = result;

			if (requestId) {
				set(pollingReqs(requestId), {
					requestId,
					publicId,
					createTime: Date.now(),
					attempts: 0,
				}, true);
			}
		} else {
			set(notifications, (prev) => [{
				type: NOTIFICATION_TYPES.COLLAGE_GENERATE_FAIL,
				severity: "error",
				message: "Unexpected error while generating collage!",
			}, ...prev]);
		}
	}
);

export default useCollageGenerator;
