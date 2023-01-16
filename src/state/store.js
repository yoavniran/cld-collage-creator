import { createSpring, springFamily } from "recoil-spring";
import { THEME_MODES } from "../styles/theme";
import { CROP_TYPES, GRAVITY_TYPES } from "../consts";

const DEFAULTS = {
	//grid properties
	gridSize: 3,
	borderColor: "#000",
	borderWidth: 1,
	width: 900,
	height: 900,
	[springFamily("gridPhotos")]: null,

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
	photosDrawerHeight: 0,
	photoOverCell: null,
	isGenerating: false,
	isMonochromeGrid: false,
	isCloudLocked: false,

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
