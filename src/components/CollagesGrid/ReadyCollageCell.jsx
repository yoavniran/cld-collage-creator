import styled from "styled-components";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { addUrlTransformation, timeAgo } from "../../utils";
import { useReadyCollage } from "../../state/selectors";
import ContainerActions from "../ContainerActions";
import TooltipIconButton from "../TooltipIconButton";
import BaseCell, { ImageContainer } from "./BaseCell";
import Tooltip from "../Tooltip/Tooltip";

const CollageImage = styled(ImageContainer)`
  background-image: url("${({ $img }) => $img}");
`

const StyledContainerActions = styled(ContainerActions)`
  width: 100%;
	
  .action-circle-container {
    &:first-child {
      width: 100%;
    }
  }
`;

const ReadyCollageCell = ({ id }) => {
	const [collage, removeCollage] = useReadyCollage(id),
		collageImg = addUrlTransformation(collage.secure_url, "$&/w_200,dpr_2/");

	const onOpenCollage = () => {
		window.open(collage.secure_url);
	};

	const onCopyUrl = () => {
		navigator.clipboard.writeText(collage.secure_url);
	};

	const onDelete = () => {
		removeCollage();
	};

	return (
		collage &&
		<Tooltip
			simple
			title={collage.public_id}
		>
			<BaseCell data-url={collage.secure_url}>
				<StyledContainerActions actions={[
					{
						key: "open",
						component: <TooltipIconButton
							onClick={onOpenCollage}
							icon={<OpenInNewIcon fontSize="medium"/>}
							aria-label="open url in new tab"
							color="secondary"
							tooltipText="Open collage in a new tab"
							tooltipDelay={400}
						/>,
					},
					{
						key: "copy-url",
						component: <TooltipIconButton
							onClick={onCopyUrl}
							icon={<ContentCopyIcon fontSize="medium"/>}
							aria-label="copy url"
							color="secondary"
							tooltipText="Copy collage URL to clipboard"
							tooltipDelay={400}
						/>,
					},
					{
						key: "delete",
						component: <TooltipIconButton
							onClick={onDelete}
							icon={<DeleteIcon fontSize="medium"/>}
							aria-label="remove collage"
							color="secondary"
							tooltipText="Remove collage from this list"
							tooltipDelay={400}
						/>,
					},
				]}/>
				<CollageImage $img={collageImg} />
				<Typography variant="caption">{timeAgo(collage.createTime)}</Typography>
			</BaseCell>
		</Tooltip>
	);
};

export default ReadyCollageCell;

