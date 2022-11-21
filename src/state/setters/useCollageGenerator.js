import { logger } from "../../utils";
import { NOTIFICATION_TYPES } from "../../consts";
import { getTrackerForAtom } from "../../recoilUtils/recoil-spring";
import atoms, { createCallbackSetter } from "../store";
import createCollage from "../../createCollage";

const {
	gridCells,
	gridPhotos,
	width,
	height,
	gridSize,
	borderColor,
	borderWidth,

	notifications,
	isGenerating,

	cloud,
	collagePreset,
	crop,
	gravity,
} = atoms;

const gridPhotosTracker = getTrackerForAtom(gridPhotos, atoms);

const getCollageData = (get) => {
	const size = get(gridSize);

	return {
		size,
		width: get(width),
		height: get(height),
		spacing: get(borderWidth),
		color: get(borderColor),
		cells: get(gridCells),
		photoIds: get(gridPhotosTracker),

		cloud: get(cloud),
		preset: get(collagePreset),
		crop: get(crop),
		gravity: get(gravity),
	};
};

const createTemplate = (size, flatCells) => {
	//template ids are 1 based...
	let templateId = 0, overrideMap = {};

	return flatCells
		.reduce((res, { position, id, override, overrideTargets }) => {
			templateId += (override ? 0 : 1);

			if (overrideTargets.length) {
				overrideTargets.forEach((t) => overrideMap[t] = templateId);
			}

			res[position[0]][position[1]] = override ? overrideMap[id] : templateId;
			return res;
		}, [...new Array(size).fill(null).map(() => [])]);
};

const createAssetsList = (flatCells, photoIds, get) => {
	return flatCells
		.filter(({ override }) => override === null)
		.map(({ id }) => {
			const gridPhoto = get(gridPhotos(id));
			return gridPhoto.cldId;
		});
};

const useCollageGenerator = createCallbackSetter({
	setter: async (
		{ get, set },
		params = {}
	) => {
		set(isGenerating, true);

		set(notifications, (prev) => [{
			type: NOTIFICATION_TYPES.COLLAGE_GENERATE,
			severity: "info",
			message: "Creating your Cloudinary Collage",
		}, ...prev]);

		const data = getCollageData(get);
		const { size, cells, photoIds } = data;
		const flatCells = cells.flat();
		const template = createTemplate(size, flatCells);
		const assets = createAssetsList(flatCells, photoIds, get);

		logger.log("generating ..... ", { data, template, assets, params });

		const result = await createCollage(
			params.id || Date.now().toString(),
			{
				...data,
				template,
				assets,
				columns: size,
				rows: size,
			});

		logger.log("GOT GENERATE RESULT !!! ", result);

		set(isGenerating, false);

		if (result.success) {
			set(notifications, (prev) => [{
				type: NOTIFICATION_TYPES.COLLAGE_GENERATE_SUCCESS,
				severity: "success",
				message: "Collage generated successfully!",
			}, ...prev]);


		} else {
			set(notifications, (prev) => [{
				type: NOTIFICATION_TYPES.COLLAGE_GENERATE_FAIL,
				severity: "error",
				message: "Unexpected error while generating collage!",
			}, ...prev]);
		}
	},
});

export default useCollageGenerator;
