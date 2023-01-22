import styled from "styled-components";
import Typography from "@mui/material/Typography";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import {
	usePollingRequests,
	useReadyCollages,
} from "../../state/selectors";
import PollingRequestCell from "./PollingRequestCell";
import ReadyCollageCell from "./ReadyCollageCell";

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  //padding: 
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
	svg {
		height: 60px;
		width: 60px;
	}
`;

const EmptyGrid = ({ className }) => {
	return (
		<EmptyContainer className={className}>
			<Typography variant="h4">No Collages (yet)</Typography>
			<HistoryToggleOffIcon fontSize="60px" color="primary"/>
			<Typography variant="h6">Time to create one!</Typography>
		</EmptyContainer>
	);
};

const CollagesGrid = ({ className }) => {
	const pollingRequests = usePollingRequests(),
		readyCollages = useReadyCollages(),
		isEmpty = !pollingRequests.length && !readyCollages.length;

	return (
		isEmpty ?
			<EmptyGrid className={className}/> :
			<GridContainer className={className}>
				{pollingRequests.map((requestId) =>
					<PollingRequestCell key={requestId} id={requestId}/>)}
				{readyCollages.map((requestId) =>
					<ReadyCollageCell key={requestId} id={requestId}/>)}
			</GridContainer>
	);
};

export default CollagesGrid;
