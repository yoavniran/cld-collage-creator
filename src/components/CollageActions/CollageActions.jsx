import styled from "styled-components";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useCollageHistory, useCollageReset } from "../../state/setters";
import GenerateButton from "./GenerateButton";

const ActionsWrapper = styled(Paper)`
  padding: 20px;
  margin: 20px 0;
  max-width: min-content;

  .MuiIconButton-root {
    margin: 0 12px;
  }
`;

const UndoRedoButtons = () => {
	const {
		previousCount: history,
		nextCount: future,
		goBack: undo,
		goForward: redo,
	} = useCollageHistory();

	return (
		<>
			<IconButton aria-label="undo last action" disabled={!history} onClick={undo}>
				<UndoIcon fontSize="large"/>
			</IconButton>
			<IconButton aria-label="redo last undone action" disabled={!future} onClick={redo}>
				<RedoIcon fontSize="large"/>
			</IconButton>
		</>
	);
};

const CollageActions = () => {
	const resetCollage = useCollageReset();

	return (
		<ActionsWrapper elevation={6}>
			<ButtonGroup variant="outlined" size="large" color="primary">
				<UndoRedoButtons/>
				<IconButton aria-label="reset to defaults" onClick={resetCollage}>
					<RestartAltIcon fontSize="large"/>
				</IconButton>
				<GenerateButton/>
			</ButtonGroup>
		</ActionsWrapper>
	);
};

export default CollageActions;
