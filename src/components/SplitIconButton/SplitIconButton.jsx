import { useState, useRef } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import TooltipIconButton from "../TooltipIconButton";

const StyledButtonGroup = styled(ButtonGroup)`

  box-shadow: 0 0 2px 0 rgb(0 0 0 / 20%);

  &:hover {
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%),
    0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  }
`;

const StyledMenu = styled(Menu)`
  position: absolute;
  top: 0;
  left: 0;
`;

const DropDownButton = styled(Button)`
  background-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.palette.action.active};
  }
`;

const SplitIconButton = ({
	                         children,
	                         className,
	                         isDisabled,
	                         ...buttonProps
                         }) => {
	const [isOpen, setOpen] = useState(false);
	const menuRef = useRef(null);

	const toggleState = () => {
		setOpen((prev) => !prev);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Box sx={{ position: "relative", color: "action.active" }} className={className}>
				<StyledButtonGroup variant="contained">
					<TooltipIconButton
						{...buttonProps}
						isDisabled={isDisabled}
						ref={menuRef}
					/>
					<DropDownButton
						size="small"
						onClick={toggleState}
						disabled={isDisabled}
					>
						<ArrowDropDownIcon/>
					</DropDownButton>
				</StyledButtonGroup>
				<StyledMenu
					anchorEl={() => menuRef.current}
					open={isOpen}
					onClose={onClose}
					onClick={onClose}
					anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
					transformOrigin={{ horizontal: 20, vertical: "top" }}
					PaperProps={{
						className: "hover-opaque"
					}}
				>
					{children}
				</StyledMenu>
			</Box>
		</>
	);
};

export default SplitIconButton;
