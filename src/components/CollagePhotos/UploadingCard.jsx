import { memo } from "react";
import styled from "styled-components";
import { useAbortItem } from "@rpldy/uploady";
import { useRetry } from "@rpldy/retry-hooks";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Badge from "@mui/material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import {
	getIsUploadFailed,
	getIsUploadInProgress,
	getIsUploadSuccess,
	getIsUploadCancelled,
} from "../../utils";
import { useUploadItem } from "../../state/selectors";
import TooltipIconButton from "../TooltipIconButton";
import Tooltip from "../Tooltip";
import BaseCard from "./BaseCard";
import PhotoMedia from "./PhotoMedia";

const UploadingBaseCard = styled(BaseCard)`
  position: relative;

  .MuiCardActions-root {
    padding: 8px 8px 8px 2px;

    button {
      margin: 0;
    }
  }
`;

const StyledLinearProgress = styled(LinearProgress)`
  width: 100%;
  height: 6px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.palette.secondary.light};
  border-radius: 2px;

  .${linearProgressClasses.bar} {
    background-color: ${({ theme, $failed, $success }) =>
            $failed ? theme.palette.error.main :
                    ($success ? theme.palette.success.main :
                            theme.palette.primary.light)};
    border-radius: 2px;
  }
`;

const UploadErrorBadge = styled(Badge)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const UploadingCard = memo(({ id, url }) => {
	const abortItem = useAbortItem();
	const retryUpload = useRetry();
	const [uploadItem, setUploadItem] = useUploadItem(id);
	const failed = uploadItem && getIsUploadFailed(uploadItem),
		success = uploadItem && getIsUploadSuccess(uploadItem),
		isCancelled = uploadItem && getIsUploadCancelled(uploadItem),
		uploading = uploadItem && getIsUploadInProgress(uploadItem);

	const onCancelUpload = () => {
		abortItem(id);
	};

	const onRetryUpload = () => {
		retryUpload(id);
	};

	const onCancelRemoveUpload = () => {
		onCancelUpload();
		//removing the item before abort finishes will leave it showing so need to delay removal
		requestAnimationFrame(() => setUploadItem(id, null));
	};

	return uploadItem && (
		<UploadingBaseCard
			firstActionAlwaysShow
			actions={[
				{
					key: "cancel-and-remove",
					component: <TooltipIconButton
						onClick={onCancelRemoveUpload}
						tooltipText="Cancel and Remove Upload"
						tooltipDelay={2000}
						icon={<DeleteIcon/>}
						size="small"
						color="secondary"
					/>,
				},
				uploading && {
					key: "cancel",
					component: <TooltipIconButton
						onClick={onCancelUpload}
						tooltipText="Cancel Upload"
						tooltipDelay={2000}
						icon={<CancelIcon/>}
						size="small"
						color="secondary"
					/>,
				},
				failed && !isCancelled && {
					key: "retry",
					component: <TooltipIconButton
						onClick={onRetryUpload}
						tooltipText="Retry Upload"
						tooltipDelay={2000}
						icon={<ReplayIcon/>}
						size="small"
						color="secondary"
					/>,
				},
			]}
		>
			{failed &&
				<Tooltip
					title={`Upload ${isCancelled ? "Cancelled" : "Failed"}`}
					placement="top"
					severity="error"
					text={isCancelled ? "Only images can be uploaded" : uploadItem.response }
				>
					<UploadErrorBadge variant="dot" color="error"/>
				</Tooltip>}
			<PhotoMedia
				url={url}
				alt={uploadItem.name}
				sx={{
					opacity: failed ? 1 : uploadItem.progress / 100,
					filter: `blur(${(Math.floor(100 - uploadItem.progress) / 5)}px)`,
				}}
			/>
			{!failed &&
				<StyledLinearProgress
					variant="determinate"
					value={uploadItem.progress}
					$failed={failed}
					$success={success}
				/>}
		</UploadingBaseCard>
	);
});

export default UploadingCard;
