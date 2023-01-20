import styled from "styled-components";
import ConfirmationModal from "../ConfirmationDialog";

const StyledCollagesDialog = styled(ConfirmationModal)`
  .MuiDialog-paper {
    max-width: 1200px;
    width: 80%;
  }
`;

const CollagesModal = ({ onClose }) => {

	return (
		<StyledCollagesDialog
			title="Collages"
			onClose={onClose}
			showCancel={false}
			confirmLabel="close"
		>

		</StyledCollagesDialog>
	);
};

export default CollagesModal;
