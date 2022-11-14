import { ThemeProvider } from "@mui/material/styles";
import useAppTheme from "./useAppTheme";

const AppThemeProvider = ({ children }) => {
	const theme = useAppTheme();

	console.log("THEME PROVIDER USING THEME ------ ", theme);

	return (
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
	);
};

export default AppThemeProvider;
