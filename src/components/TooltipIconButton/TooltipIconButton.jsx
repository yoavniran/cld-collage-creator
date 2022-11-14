import { forwardRef } from "react";
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

const TooltipIconButton = forwardRef((
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
	}, ref) => {
	const showTooltip = !!(tooltipText || tooltipTitle) &&
		(!isDisabled && !tooltipOnDisabled || isDisabled && tooltipOnDisabled);

	return (
		<Tooltip
			show={showTooltip}
			title={tooltipTitle}
			text={tooltipText}
			severity={tooltipSeverity}
			delay={tooltipDelay}
		>
			<StyledIconButton
				ref={ref}
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
});

export default TooltipIconButton;
