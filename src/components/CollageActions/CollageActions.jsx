import styled from "styled-components";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import useCollageHistory from "../../state/useCollageHistory";
import { useCollageReset } from "../../state/setters";
import TooltipIconButton from "../TooltipIconButton";
import GenerateButton from "./GenerateButton";
import CollagesButton from "./CollagesButton";

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
			<TooltipIconButton
				aria-label="undo last action"
				isDisabled={!history}
				onClick={undo}
				icon={<UndoIcon fontSize="large"/>}
				tooltipTitle="Undo last action"
				tooltipSimple
				tooltipOnDisabled
			/>

			<TooltipIconButton
				aria-label="redo last undone action"
				isDisabled={!future}
				onClick={redo}
				icon={	<RedoIcon fontSize="large"/>}
				tooltipTitle="Redo last action"
				tooltipSimple
				tooltipOnDisabled
			/>
		</>
	);
};

const CollageActions = () => {
	const resetCollage = useCollageReset();

	return (
		<ActionsWrapper elevation={6}>
			<ButtonGroup variant="outlined" size="large" color="primary">
				<CollagesButton />
				<UndoRedoButtons/>
				<TooltipIconButton
					aria-label="reset to defaults"
					onClick={resetCollage}
					icon={<RestartAltIcon fontSize="large"/>}
					tooltipTitle="Reset Grid to default settings"
					tooltipSimple
				/>
				<GenerateButton/>
			</ButtonGroup>
		</ActionsWrapper>
	);
};

export default CollageActions;
