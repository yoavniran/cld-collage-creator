import merge from "lodash/merge";
import {
	createTheme,
	responsiveFontSizes,
	experimental_sx as sx,
} from "@mui/material/styles";
import { alpha } from "@mui/material";

const THEME_MODES = {
	DARK: "dark",
	LIGHT: "light",
};

const getComponentOverride = (name, styles, additional) => ({
	[name]: {
		styleOverrides: {
			root: { ...styles },
			...additional
		}
	}
});

const darkTheme = {
	isDark: () => true,
	isLight: () => false,

	spacing: 1,

	palette: {
		mode: THEME_MODES.DARK,

		primary: {
			light: "#0288d1",
			main: "#022e46",
			dark: "#1d292f",
			contrastText: "#fff",
		},
		secondary: {
			light: "#545b60",
			main: "#cbe5f5",
			dark: "#272c2f",
			contrastText: "#b7b5b5",
		},
		error: {
			main: "#f3092c",
		},
		success: {
			main: "#08ff00"
		},
		action: {
			active: "#2baaef",
			focus: "rgba(62,108,133,0.58)",
			disabled: "rgba(119,140,150,0.8)",
		},
		background: {
			paper: "rgba(38,50,56,0.65)",
			default: "#849198",
		},
		text: {
			primary: "#FFF",
			secondary: "#FFF",
		},
		divider: "rgba(74,137,171,0.42)",
	},

	components: {
		...getComponentOverride("MuiAppBar", {
			backgroundColor: "#022e46",
		}),
		...getComponentOverride("MuiDialog", {}, {
				paper: ({ theme }) => ({
					minWidth: 320,
					minHeight: 280,
					backgroundColor: alpha(theme.palette.background.paper, 0.95),
				})
			}
		)
		// ...getComponentOverride("MuiSwitch", {}, {
		// 	track: ({ ownerState, theme }) => {
		// 		console.log("SWITCH TRACK OVERRIDE @@@@@@@@@@@@ ", ownerState);
		// 		return {
		// 			opacity: 1,
		// 			backgroundColor: ownerState.checked ?
		// 				theme.palette.success.main :
		// 				theme.palette.grey[500],
		// 		};
		// 	},
		// }),
	},

	typography: {
		allVariants: {
			fontFamily: "'Roboto Serif', serif",
		}
	}
};

const lightTheme = merge({}, darkTheme, {
	isDark: () => false,
	isLight: () => true,

	palette: {
		mode: THEME_MODES.LIGHT,

		primary: {
			contrastText: "#000",
			dark: "#8b979d",
		},
		background: {
			paper: "rgba(177,185,190,0.75)",
			default: "#dce1e3",
		},
		text: {
			primary: "#000000",
			secondary: "#000000",
		},
		action: {
			active: "#114764",
		}
	},

	components: {
		...getComponentOverride("MuiAppBar", {
			backgroundColor: "#a3bece",
		}),
	},
});

const getTheme = (custom) =>
	responsiveFontSizes(createTheme(custom), { factor: 3 });

const THEMES = {
	[THEME_MODES.DARK]: getTheme(darkTheme),
	[THEME_MODES.LIGHT]: getTheme(lightTheme),
};

export default THEMES;

export { THEME_MODES };
