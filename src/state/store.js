import { createSpring, springFamily } from "recoil-spring";
import { THEME_MODES } from "../styles/theme";
import { CLOUD_ENTRY_MODE, CROP_TYPES, GRAVITY_TYPES } from "../consts";

const DEFAULTS = {
	//grid properties
	gridSize: 3,
	borderColor: "#000",
	borderWidth: 1,
	width: 900,
	height: 900,
	[springFamily("gridPhotos")]: null,
	[springFamily("pollingReqs")]: null,
	[springFamily("collages")]: null,

	//grid computed
	gridCells: [],
	lastOverride: null,

	//settings
	cloud: "",
	collagePreset: "",
	uploadPreset: "",
	isSamePreset: true,
	crop: CROP_TYPES[0],
	gravity: GRAVITY_TYPES[0],

	//ui state
	themeMode: THEME_MODES.DARK,
	notifications: [],
	isAppDrawerOpen: false,
	photosDrawerHeight: 200,
	photoOverCell: null,
	isGenerating: false,
	isMonochromeGrid: false,
	cloudEntryMode: CLOUD_ENTRY_MODE.OPEN,

	//debug options
	isDebug: false,
	isMockUpload: false,

	//collections of uploads that turn into photos for the collage
	[springFamily("uploads")]: null,
	[springFamily("photos")]: null,

	damConfig: null,
	isDam: false,
};

const spring = createSpring({ ...DEFAULTS });

window.__collageSpring = spring;

const {
	atoms,
} = spring;

export default atoms;

export {
	DEFAULTS,
	spring,
};
