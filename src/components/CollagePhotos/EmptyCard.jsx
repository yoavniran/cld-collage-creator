import styled from "styled-components";
import { asUploadButton } from "@rpldy/upload-button";
import AddIcon from "@mui/icons-material/Add";
import { useUploadDetails } from "../../state/selectors";
import TooltipIconButton from "../TooltipIconButton";
import BaseCard from "./BaseCard";

const CANT_UPLOAD_TEXT =
	"To upload an image, you must provide cloud name and upload preset in the Menu's Settings section.";

const UploadButton = asUploadButton(TooltipIconButton);

const StyledUploadButton = styled(UploadButton)`
	padding: 32px;
`;

const EmptyBaseCard = styled(BaseCard)`
  justify-content: center;
  padding-top: 20px;
`;

const EmptyCard = ({}) => {
	const uploadDetails = useUploadDetails();
	const canUpload = !!uploadDetails;

	return (
		<EmptyBaseCard
			tooltipText="Click the upload button, drag&drop files over, or paste from your clipboard"
		>
			<StyledUploadButton
				extraProps={{
					isDisabled: !canUpload,
					tooltipOnDisabled: true,
					tooltipText: CANT_UPLOAD_TEXT,
					tooltipTitle: "Notice!",
					tooltipDelay:  1000,
					"aria-label": "upload image",
					icon: <AddIcon fontSize="large"/>,
				}}
			/>
		</EmptyBaseCard>
	);
};

export default EmptyCard;
