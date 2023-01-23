import styled, { keyframes } from "styled-components";
import Typography from "@mui/material/Typography";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { timeAgo } from "../../utils";
import { usePollingRequest } from "../../state/selectors";
import Tooltip from "../Tooltip/Tooltip";
import BaseCell, { ImageContainer } from "./BaseCell";

const pollingAnimate = keyframes`
  from {
    opacity: 0.2;
    scale: 0.2;
  }

  to {
    opacity: 1;
    scale: 1;
  }
`;

const PollingCell = styled(BaseCell)`
  svg {
    width: 44px;
    height: 44px;
    animation: ${pollingAnimate} 1.5s linear infinite alternate running;
  }
`;

const PollingRequestCell = ({ id }) => {
	const req = usePollingRequest(id);

	return (req &&
		<Tooltip
			simple
			title={req.publicId}
		>
			<PollingCell>
				<ImageContainer>
					<HourglassEmptyIcon fontSize="44" color="primary"/>
				</ImageContainer>
				<Typography variant="caption">{timeAgo(req.createTime)}</Typography>
			</PollingCell>
		</Tooltip>
	);
};

export default PollingRequestCell;
