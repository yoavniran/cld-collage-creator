import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";
import { getTrackerForAtom } from "../../recoilUtils/recoil-spring";

const {
	gridCells,
	gridPhotos,
	width,
	height,
	gridSize,
	borderColor,
	borderWidth,
	crop,
	gravity,
} = atoms;

const gridPhotosTracker = getTrackerForAtom(gridPhotos, atoms);

const getCollageData = (get) => ({
	size: get(gridSize),
	width: get(width),
	height: get(height),
	spacing: get(borderWidth),
	color: get(borderColor),
	cells: get(gridCells),
	photoIds: get(gridPhotosTracker),
	crop: get(crop),
	gravity: get(gravity),
});

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

const useCollageManifest = createSelectorHook(
	"CollageManifestSelector",
	(get) => {
		const { size, cells, photoIds, spacing, color, width, height, crop, gravity } = getCollageData(get);
		const flatCells = cells.flat();
		const template = createTemplate(size, flatCells);
		const assets = createAssetsList(flatCells, photoIds, get);

		return {
			template,
			width,
			height,
			columns: size,
			rows: size,
			spacing,
			color,
			assetDefaults: { kind: "upload", crop, gravity },
			assets: Object.values(assets).map((id) => ({ media: id })),
		};
	},
	false,
);

export default useCollageManifest;
