import Container from "@mui/material/Container";
import ThemeModeSwitcher from "../ThemeModeSwitcher";
import SettingsMenu from "../SettingsMenu";

const AppSettings = () => {
	return (
		<Container sx={{ display: "flex", justifyContent: "end", alignItems: "center", }}>
			<SettingsMenu />
			<ThemeModeSwitcher />
		</Container>
	)
};

export default AppSettings;
