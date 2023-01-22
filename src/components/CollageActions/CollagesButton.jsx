import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import TooltipIconButton from "../TooltipIconButton";
import CollagesModal from "./CollagesModal";
import { useIsPollingCollages } from "../../state/selectors";

const blinkAnimate = keyframes`
  from {
    opacity: 0.2;
  }

  to {
    opacity: 1;
  }
`;

const pollingCss = css`
  svg {
    animation: ${blinkAnimate} 1s linear infinite alternate running;
  }
`;

const StyledButton = styled(TooltipIconButton)`
  &.MuiIconButton-root {
    ${({ $polling }) => $polling && pollingCss};
  }
`;

const CollagesButton = () => {
	const isPolling = useIsPollingCollages();
	const [isCollagesShowing, setCollagesShowing] = useState(false);

	const onShowCollages = () => {
		setCollagesShowing(true);
	};

	const onCollagesModelClose = () => {
		setCollagesShowing(false);
	};

	return (
		<>
		<StyledButton
			aria-label="see created collages"
			onClick={onShowCollages}
			icon={<BookmarksIcon fontSize="large"/>}
			tooltipTitle="View created collages"
			tooltipSimple
			$polling={isPolling}
		/>
			{isCollagesShowing &&
				<CollagesModal onClose={onCollagesModelClose} />}
		</>
	);
};

export default CollagesButton;
