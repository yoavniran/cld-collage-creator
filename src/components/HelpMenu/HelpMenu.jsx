import { useState } from "react";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import LaunchIcon from "@mui/icons-material/Launch";
import HelpIcon from "@mui/icons-material/Help";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import IconButtonMenu from "../IconButtonMenu";

const StyledMenuItem = styled(MenuItem)`
  .MuiButtonBase-root {
	  width: 100%;
	  justify-content: flex-start;
	  
	  color: ${({ theme }) => theme.palette.action.active};
  }
`;

const HelpMenu = ({ showAboutModal }) => {
	const [isMenuOpen, setMenuOpen] = useState(false);

	return (
		<IconButtonMenu
			onOpenChange={setMenuOpen}
			icon={<InfoIcon
				fontSize="large"
				color={isMenuOpen ? "disabled" : undefined}
			/>}
			tooltipTitle="Help & Info"
		>
			<StyledMenuItem>
				<Button
					variant="text"
					endIcon={<LaunchIcon fontSize="16"/>}
					href="https://cloudinary.com/documentation/image_collage_generation"
					target="_blank"
					rel="noopener"
				>
					<HelpIcon fontSize="large"/>
					Documentation
				</Button>
			</StyledMenuItem>
			<StyledMenuItem>
				<Button
					variant="text"
					endIcon={<LaunchIcon fontSize="16"/>}
					href="https://github.com/yoavniran/cld-collage-creator"
					target="_blank"
					rel="noopener"
				>
					<GitHubIcon fontSize="large"/>
					Code
				</Button>
			</StyledMenuItem>
			<StyledMenuItem>
				<Button
					variant="text"
					onClick={showAboutModal}
				>
					<LightbulbIcon fontSize="large"/>
					About
				</Button>
			</StyledMenuItem>
		</IconButtonMenu>
	);
};

export default HelpMenu;
