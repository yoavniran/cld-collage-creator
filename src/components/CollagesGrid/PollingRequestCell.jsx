import styled, { keyframes } from "styled-components";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { usePollingRequest } from "../../state/selectors";
import BaseCell from "./BaseCell";

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
		<PollingCell>
			<HourglassEmptyIcon fontSize="44" color="primary"/>
		</PollingCell>
	);
};

export default PollingRequestCell;
