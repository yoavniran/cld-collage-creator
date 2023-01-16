export const LS_KEY = "ccc_ls_data";

export const DRAG_TYPES = {
	PHOTO: "photo",
};

export const NOTIFICATION_TYPES = {
	COLLAGE_RESET: "collage-reset",
	COLLAGE_GENERATE: "collage-generate",
	COLLAGE_GENERATE_FAIL: "collage-generate-fail",
	COLLAGE_GENERATE_SUCCESS: "collage-generate-success",
	FILL_GRID: "fill-grid",
};

export const GRAVITY_TYPES = [
	"center", "north_west", "north_east", "south_west", "south_east", "north", "west", "south", "east", "auto",
];

export const CROP_TYPES = [
	"pad", "fill", "crop", "scale", "fit",
];

export const MIN_SIZE = 1;
export const MAX_SIZE = 10;
export const MIN_BORDER = 1;
export const MAX_BORDER = 6;
export const MIN_DIM = 100;
export const MAX_DIM = 2000;

export const GENERATE_REPORT_TYPES = {
	CLOUD: "cloud",
	PRESET: "preset",
	CELLS: "cells",
};

export const WEBHOOK_URL_BASE = "https://cld-collage-creator.netlify.app/.netlify/functions/";
