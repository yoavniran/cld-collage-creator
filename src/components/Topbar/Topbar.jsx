import styled, { css } from "styled-components";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useAppDrawerStatus } from "../../state/selectors";
import useFloatingMenuMediaQuery from "../hooks/useFloatingMenuMediaQuery";
import Logo from "../Logo";
import AppSettings from "../AppSettings";

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
	const showFloating = useFloatingMenuMediaQuery();

	return (
		<StyledAppBar position="static">
			<StyledToolbar>
				<BarLeftSide>
					<Logo/>
					<Title/>
				</BarLeftSide>

				<BarRightSize>
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
		</StyledAppBar>
	);
};

export default Topbar;
