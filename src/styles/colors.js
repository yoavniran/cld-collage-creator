import { blueGrey, deepOrange, red, deepPurple, blue, pink, indigo, cyan, teal, lime, orange, amber } from "@mui/material/colors";
import { randomizeArray } from "../utils";

const COLORS = randomizeArray([
	blueGrey,
	deepOrange,
	red,
	deepPurple,
	blue,
	pink,
	indigo,
	cyan,
	teal,
	lime,
	orange,
	amber
]);

const ACCENT_COLORS = [100, 200, 400, 700];

//TODO: reverse intensity order depending on theme (dark/light)
const getColor = ([i, j]) => {
	const val = i * 100;
	return COLORS[j][ACCENT_COLORS.includes(val) ? `A${val}` : (!val ? 100 : val)];
};

export {
	COLORS,
	getColor,
};
