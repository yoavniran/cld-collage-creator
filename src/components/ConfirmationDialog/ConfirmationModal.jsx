import styled from "styled-components";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TooltipIconButton from "../TooltipIconButton";
import useAppTheme from "../../styles/useAppTheme";

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    max-width: 900px;
    width: 50%;
  }

  .MuiDialogActions-root {
    .MuiButton-root {
      &:hover {
        color: #FFF;
      }
    }
  }
`;

const CloseButton = styled(TooltipIconButton)`
	position: absolute;
	top: 0;
	right: 0;
`;

const ConfirmationModal = ({
	                           title,
	                           isOpen = true,
	                           onClose,
	                           children,
	                           confirmLabel = "OK",
	                           cancelLabel = "Cancel",
	                           showCancel = true,
                           }) => {
	const theme = useAppTheme();

	const handleClose = (confirm) => {
		onClose(confirm);
	};

	return (
		<StyledDialog
			open={isOpen}
			onClose={() => handleClose(false)}
		>
			<DialogTitle>
				{title}
				<CloseButton
					icon={<CloseIcon fontSize="large" />}
					onClick={() => handleClose()}
				/>
			</DialogTitle>
			<DialogContent dividers>
				{children}
			</DialogContent>
			<DialogActions>
				{
					showCancel &&
					<Button
						variant="outlined"
						color="secondary"
						autoFocus
						onClick={() => handleClose(false)}
					>
						{cancelLabel}
					</Button>
				}
				<Button
					sx={{
						backgroundColor: "action.active",
				}}
					onClick={() => handleClose(true)}
				>
					{confirmLabel}
				</Button>
			</DialogActions>
		</StyledDialog>
	);
};

export default ConfirmationModal;
