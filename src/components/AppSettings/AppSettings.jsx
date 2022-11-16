import { useState } from "react";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDebug, useMockUpload } from "../../state/selectors";
import IconButtonMenu from "../IconButtonMenu";
import ThemeModeSwitcher from "../ThemeModeSwitcher";
import SimpleSwitch from "../SimpleSwitch";

//TODO: Add Switch to monochrome grid instead of colorful
//TODO: Add button to reset all settings (clear LS) with confirmation dialog


const AppSettings = () => {
	const [isDebug, setDebug] = useDebug();
	const [isMockUpload, setMockUpload] = useMockUpload();
	const [isMenuOpen, setMenuOpen] = useState(false);

	const toggleDebug = () => setDebug(!isDebug);
	const toggleMockUpload = () => setMockUpload(!isMockUpload);

	return (
		<Container sx={{ display: "flex", justifyContent: "end", alignItems: "center", }}>
			<IconButtonMenu
				onOpenChange={setMenuOpen}
				closeOnClick={false}
				icon={<SettingsIcon
					fontSize="large"
					color={isMenuOpen ? "disabled" : undefined}
				/>}
			>
				<MenuItem>
					<FormControlLabel
						control={<SimpleSwitch checked={isDebug} onChange={toggleDebug} />}
						label="Debug"
					/>
				</MenuItem>
				<MenuItem>
					<FormControlLabel
						control={<SimpleSwitch checked={isMockUpload} onChange={toggleMockUpload} />}
						label="Mock Upload"
					/>
				</MenuItem>
			</IconButtonMenu>

			<ThemeModeSwitcher />
		</Container>
	)
};

export default AppSettings;
