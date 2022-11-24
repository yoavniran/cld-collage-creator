import {
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
	amber,
	grey,
	lightBlue,
} from "@mui/material/colors";
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
	amber,
	lightBlue,
]);

const MONOCHROME_COLORS = [
	grey,
	blueGrey,
	grey,
	blueGrey,
	grey,
	blueGrey,
	grey,
	blueGrey,
	grey,
	blueGrey,
];

const ACCENT_COLORS = [100, 200, 400, 700];

const getPositionColor = (colors, [i, j]) => {
	const val = i * 100;
	return colors[j][ACCENT_COLORS.includes(val) ? `A${val}` : (!val ? 100 : val)];
}

//TODO: reverse intensity order depending on theme (dark/light)
const getColor = (position) => getPositionColor(COLORS, position);

const getMonochromeColor = (position) =>
	getPositionColor(MONOCHROME_COLORS, position);

export {
	COLORS,
	getColor,
	getMonochromeColor,
};
