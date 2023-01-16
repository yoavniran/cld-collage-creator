import { useState } from "react";
import IconButtonMenu from "../IconButtonMenu";
import InfoIcon from "@mui/icons-material/Info";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import MenuItem from "@mui/material/MenuItem";

const HelpMenu = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);

	return (
		<IconButtonMenu
			onOpenChange={setMenuOpen}
			// closeOnClick={false}
			icon={<InfoIcon
				fontSize="large"
				color={isMenuOpen ? "disabled" : undefined}
			/>}
			tooltipTitle="Settings"
		>
			<MenuItem>

			</MenuItem>
		</IconButtonMenu>
	);
};

export default HelpMenu;
