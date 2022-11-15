import { createSpring, springFamily } from "../recoilUtils/recoil-spring";
import { THEME_MODES } from "../styles/theme";

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
	crop: "scale",
	gravity: "center",

	//ui state
	themeMode: THEME_MODES.DARK,
	notifications: [],
	isAppDrawerOpen: false,
	photosDrawerHeight: 0,
	photoOverCell: null,
	isGenerating: false,

	//debug options
	isDebug: false,
	isMockUpload: false,

	//collections of uploads that turn into photos for the collage
	[springFamily("uploads")]: null,
	[springFamily("photos")]: null,
};

const MIN_SIZE = 1,
	MAX_SIZE = 10,
	MIN_BORDER = 1,
	MAX_BORDER = 6,
	MIN_DIM = 100,
	MAX_DIM = 2000;

const spring = createSpring({ ...DEFAULTS });

window.__collageSpring = spring;

const {
	atoms,
	createSelectorFamilyHook,
	createTrackerSelectorHook,
	createRecoilHistoryHook,
	createTransactionHookSetter,
} = spring;

export default atoms;

export {
	DEFAULTS,
	MIN_SIZE,
	MAX_SIZE,
	MIN_BORDER,
	MAX_BORDER,
	MIN_DIM,
	MAX_DIM,
	spring,

	createSelectorFamilyHook,
	createTrackerSelectorHook,
	createRecoilHistoryHook,
	createTransactionHookSetter,
};
