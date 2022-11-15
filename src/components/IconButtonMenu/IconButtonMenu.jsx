import { useRef, useState } from "react";
import styled from "styled-components";
import { alpha } from "@mui/system/colorManipulator";
import Menu from "@mui/material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TooltipIconButton from "../TooltipIconButton";

const getMenuBackground = ({ theme }) =>
	alpha(theme.palette.background.paper, 0.95);

const StyledMenu = styled(Menu)`
	.MuiPaper-root {
		min-width: 200px;
    background: ${getMenuBackground};
		overflow: visible;
    padding: 8px 0;
    filter: drop-shadow(0px 2px 8px rgba(0,0,0,0.32));
    
		&:before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 14px;
      width: 14px;
      height: 14px;
      background: ${getMenuBackground};
      transform: translateY(-50%) rotate(45deg);
      z-index: 0;
		}
	}

  .MuiMenuItem-root {
	  font-size: 1.2rem;

    .MuiSvgIcon-root {
	    margin-right: 14px;
    }
  }
`;

const IconButtonMenu = (
	{
		className,
		menuClassName,
		children,
		icon,
		iconSize = "large",
		onOpenChange,
		closeOnClick = true,
	}) => {
	const [isOpen, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const updateState = (val) => {
		onOpenChange?.(val);
		return val;
	};

	const onClick = () => {
		setOpen((prev) => updateState(!prev));
	};

	const onClose = (e, reason) => {
		if (reason || closeOnClick) {
			setOpen(updateState(false));
		}
	};

	return (
		<>
			<TooltipIconButton
				className={className}
				ref={anchorRef}
				onClick={onClick}
				icon={
					icon || <ExpandMoreIcon
						color={isOpen ? "disabled" : undefined}
						fontSize={iconSize}
					/>
				}
			/>
			<StyledMenu
				className={menuClassName}
				anchorEl={() => anchorRef.current}
				id="account-menu"
				open={isOpen}
				onClose={onClose}
				onClick={onClose}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				{children}
			</StyledMenu>
		</>
	);
};

export default IconButtonMenu;
