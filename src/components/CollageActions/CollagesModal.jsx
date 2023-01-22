import styled from "styled-components";
import ConfirmationModal from "../ConfirmationDialog";
import CollagesGrid from "../CollagesGrid";

const StyledCollagesDialog = styled(ConfirmationModal)`
  .MuiDialog-paper {
    max-width: 1200px;
    width: 80%;
  }
`;

const CollagesModal = ({ onClose }) => {
	return (
		<StyledCollagesDialog
			title="Your Collages"
			onClose={onClose}
			showCancel={false}
			confirmLabel="close"
		>
			<CollagesGrid />
		</StyledCollagesDialog>
	);
};

export default CollagesModal;
