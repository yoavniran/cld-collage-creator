import styled, { css } from "styled-components";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useAppDrawerStatus } from "../../state/selectors";
import useFloatingMenuMediaQuery from "../hooks/useFloatingMenuMediaQuery";
import CollageMenu from "../CollageMenu";
import AppSettings from "../AppSettings";

const DRAWER_WIDTH = 350;

const toolbarMixin = css(({ theme }) => ({
	...theme.mixins.toolbar,
}));

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.spacing(0, 8, 0, 2)};
  ${toolbarMixin}
`;

const StyledDrawer = styled(Drawer)`
	${DrawerHeader} {
		justify-content: space-between;
	}
`;

const AppDrawer = () => {
	const [isAppDrawerOpen, setAppDrawerOpen] = useAppDrawerStatus(false);
	const showFloating = useFloatingMenuMediaQuery();

	const onCloseClick = () => {
		setAppDrawerOpen(false);
	};

	const onClosed = () => {
		setAppDrawerOpen(false);
	};

	return !showFloating && (
		<StyledDrawer
			open={isAppDrawerOpen}
			anchor="right"
			onClose={onClosed}
			PaperProps={{
				sx: { bgcolor: "primary" },
				className: "hover-opaque",
			}}
		>
			<Box
				sx={{ width: DRAWER_WIDTH, background: "primary" }}
				role="presentation"
			>
				<DrawerHeader>
					<IconButton onClick={onCloseClick} size="large">
						<ChevronRightIcon/>
					</IconButton>
					<AppSettings />
				</DrawerHeader>
				<Divider/>
				<CollageMenu/>
			</Box>
		</StyledDrawer>
	);
};

export default AppDrawer;
