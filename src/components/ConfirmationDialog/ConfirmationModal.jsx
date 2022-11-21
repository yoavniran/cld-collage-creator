import styled from "styled-components";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

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

const ConfirmationModal = ({
	                           title,
	                           isOpen = true,
	                           onClose,
	                           children,
	                           confirmLabel = "OK",
                           }) => {
	const handleClose = (confirm) => {
		onClose(confirm);
	};

	return (
		<StyledDialog
			open={isOpen}
			onClose={() => handleClose(false)}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent dividers>
				{children}
			</DialogContent>
			<DialogActions>
				<Button sx={{ backgroundColor: "action.active" }}
				        autoFocus
				        onClick={() => handleClose(false)}
				>
					Cancel
				</Button>
				<Button sx={{ backgroundColor: "action.active" }}
				        onClick={() => handleClose(true)}
				>
					{confirmLabel}
				</Button>
			</DialogActions>
		</StyledDialog>
	);
};

export default ConfirmationModal;
