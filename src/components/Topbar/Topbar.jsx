import { useState } from "react";
import styled, { css } from "styled-components";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDrawerStatus, useIsDam } from "../../state/selectors";
import useFloatingMenuMediaQuery from "../hooks/useFloatingMenuMediaQuery";
import HelpMenu from "../HelpMenu";
import Logo from "../Logo";
import AppSettings from "../AppSettings";
import AboutModal from "./AboutModal";

const StyledAppBar = styled(AppBar)`
  padding: 0 12px;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const sideCss = css`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const BarLeftSide = styled.div`
  font-family: "Aclonica", sans-serif;
  ${sideCss}
`;

const BarRightSize = styled.div`
  ${sideCss}
`;

const Title = () => <Typography
	variant="h4"
	noWrap
	sx={{
		ml: 10,
		display: { xs: "none", sm: "flex" },
		fontFamily: "'Chicle', cursive",
		fontWeight: 700,
		letterSpacing: ".3rem",
		color: "inherit",
		textDecoration: "none",
	}}
>
	CCC
</Typography>

const Topbar = () => {
	const [isAppDrawerOpen, setAppDrawerOpen] = useAppDrawerStatus(false);
	const [isShowingAboutModal, setShowingAboutModal] = useState(false);
	const isDam = useIsDam();
	const showFloating = useFloatingMenuMediaQuery();

	return (
		<StyledAppBar position="static">
			<StyledToolbar>
				<BarLeftSide>
					{
						!isDam &&
						<>
							<Logo/>
							<Title/>
						</>
					}
				</BarLeftSide>

				<BarRightSize>

					<HelpMenu showAboutModal={() => setShowingAboutModal(true)}/>

					{!isAppDrawerOpen && <AppSettings />}

					{!showFloating && !isAppDrawerOpen && <IconButton
						aria-label="open side-menu"
						onClick={() => {
							setAppDrawerOpen(true);
						}}
					>
						<MenuIcon/>
					</IconButton>}
				</BarRightSize>
			</StyledToolbar>
			{isShowingAboutModal && <AboutModal onClose={() => setShowingAboutModal(false)}/>}
		</StyledAppBar>
	);
};

export default Topbar;
