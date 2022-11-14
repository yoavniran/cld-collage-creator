import styled from "styled-components";
import Paper from "@mui/material/Paper";
import useFloatingMenuMediaQuery from "../hooks/useFloatingMenuMediaQuery";
import CollageMenu from "../CollageMenu";

const MenuWrapper = styled(Paper)`
  min-width: 260px;
	max-width: min-content;
	align-self: center;

  transition: z-index 0.5s;
	
	&:hover {
		z-index: 1000;
	}
`;

const CollageFloatingMenu = () => {
	const showFloating = useFloatingMenuMediaQuery();

	return (showFloating &&
		<MenuWrapper elevation={8} className="hover-opaque">
			<CollageMenu/>
		</MenuWrapper>
	);
};

export default CollageFloatingMenu;
