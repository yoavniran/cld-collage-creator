import { Suspense, lazy } from "react";
import styled from "styled-components";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useCollageManifest } from "../../state/selectors";
import ConfirmationModal from "../ConfirmationDialog";
import PageSpinner from "../PageSpinner";
import TooltipIconButton from "../TooltipIconButton";

const SyntaxHighlight = lazy(() => import("../SyntaxHighlight/SyntaxHighlight.jsx"));

const StyledPageSpinner = styled(PageSpinner)`
  position: absolute;
  padding-top: 40px;
`;

const StyledSyntaxHighlight = styled(SyntaxHighlight)`
  min-height: 400px;
  max-height: 600px;
`;

const CodeContainer = styled.div`
  position: relative;
  min-height: 200px;
  width: 100%;
`;

const CopyButton = styled(TooltipIconButton)`
  position: absolute;
  top: 0;
  right: 0;
`;

const ManifestModal = ({
	                       onClose,
                       }) => {
	const manifest = useCollageManifest();
	const manifestStr = JSON.stringify(manifest, null, 1);

	const onCopy = () => {
		navigator.clipboard.writeText(manifestStr);
	};

	return (
		<ConfirmationModal
			title="Collage Manifest JSON"
			onClose={onClose}
			confirmLabel="Save As"
			cancelLabel="Close"
		>
			<CodeContainer>
				<Suspense fallback={<StyledPageSpinner size={60}/>}>
					<CopyButton
						tooltipTitle="Copy JSON"
						icon={<ContentCopyIcon fontSize="large"/>}
						onClick={onCopy}
					/>
					<StyledSyntaxHighlight
						language="json"
						code={manifestStr}
					/>
				</Suspense>
			</CodeContainer>
		</ConfirmationModal>
	);
};

export default ManifestModal;
