import { ThemeProvider } from "@mui/material/styles";
import { logger } from "../utils"
import useAppTheme from "./useAppTheme";

const AppThemeProvider = ({ children }) => {
	const theme = useAppTheme();

	logger.log("THEME PROVIDER USING THEME ------ ", theme);

	return (
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
	);
};

export default AppThemeProvider;
