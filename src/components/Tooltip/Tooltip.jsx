import styled from "styled-components";
import isString from "lodash/isString";
import MuiTooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";

const TooltipContent = ({ title, text, severity }) => {
	return <Alert severity={severity} sx={{ color: "primary.contrastText", backgroundColor: "background.paper" }}>
		{title && <AlertTitle>{title}</AlertTitle>}
		{isString(text) ?
			<Typography variant="subtitle1">{text}</Typography> :
			text}
	</Alert>;
};

const Tooltip = (
	{
		children,
		show = true,
		placement = "bottom",
		className,
		delay = 100,
		nextDelay,
		simple = false,
		open,
		...contentProps
	}) => {
	return (
		<MuiTooltip
			arrow
			open={open}
			TransitionComponent={Zoom}
			title={show ? (simple ? contentProps.title : <TooltipContent {...contentProps} />) : ""}
			placement={placement}
			classes={{ popper: className }}
			enterDelay={delay}
			enterNextDelay={nextDelay || delay || 0}
		>
			{children}
		</MuiTooltip>);
};

const CustomTooltip = styled(Tooltip)`
  .${tooltipClasses.tooltip} {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }

  .${tooltipClasses.arrow} {
    color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export default CustomTooltip;
