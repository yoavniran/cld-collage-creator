import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Tooltip from "../Tooltip";

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root.Mui-disabled {
    pointer-events: all;

    .MuiBadge-root {
      padding: inherit;
      position: absolute;
      top: 0;
      right: 0;

      .MuiBadge-badge {
        position: relative;
      }
    }
  }
`;

const TooltipIconButton = (
	{
		onClick,
		isDisabled = false,
		tooltipOnDisabled = false,
		tooltipTitle,
		tooltipText,
		tooltipSeverity = "info",
		tooltipDelay = 100,
		icon,
		...buttonProps
	}) => {
	return (
		<Tooltip
			show={!isDisabled && !tooltipOnDisabled || isDisabled && tooltipOnDisabled}
			title={tooltipTitle}
			text={tooltipText}
			severity={tooltipSeverity}
			delay={tooltipDelay}
		>
			<StyledIconButton
				onClick={isDisabled ? undefined : onClick}
				disabled={isDisabled}
				component={isDisabled ? "div" : undefined}
				{...buttonProps}
			>
				{isDisabled &&
					<Badge variant="dot" color="error"/>}
				{icon}
			</StyledIconButton>
		</Tooltip>
	);
};

export default TooltipIconButton;
