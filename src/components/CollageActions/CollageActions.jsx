import styled from "styled-components";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MenuItem from "@mui/material/MenuItem";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useCollageHistory, useCollageReset, useCollageGenerator } from "../../state/setters";
import { useCanGenerate, useGenerating, useIsDarkMode } from "../../state/selectors";
import GutterCircleProgress from "../GutterCircleProgress";
import useAppTheme from "../../styles/useAppTheme";
import SplitIconButton from "../SplitIconButton";

const ActionsWrapper = styled(Paper)`
  padding: 20px;
  margin: 20px 0;
  max-width: min-content;

  .MuiIconButton-root {
    margin: 0 12px;
  }
`;

const CheckList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    display: flex;
    gap: 8px;
  }
`;

const CantGenerateTooltipText = ({ report }) => {
	return (
		<CheckList>
			{report.checks.map(({ status, text }) =>
				<Typography
					key={text}
					variant="subtitle"
					color="success"
					sx={{ color: status ? "success.main" : "gray" }}
				>
					<CheckCircleIcon fontSize="small" color={status ? "success" : "gray"}/>
					{text}
				</Typography>)}
		</CheckList>
	);
};

const GeneratingProgress = styled(GutterCircleProgress)`
  svg {
    margin: 3px;
  }
`;

const GenerateButton = () => {
	const generate = useCollageGenerator();
	const isGenerating = useGenerating();
	const canGenerateReport = useCanGenerate();
	const isDarkMode = useIsDarkMode();
	const theme = useAppTheme();

	console.log("Rendering Generate Button - ", {
		isGenerating,
		canGenerateReport,
	});


	return (
		isGenerating ?
			<Box sx={{ color: "action.active", margin: "0 15px" }}>
				<GeneratingProgress
					gutterColor={theme.palette.grey[isDarkMode ? 600 : 500]}
					color="inherit"
					size={44}
					thickness={4}
				/>
			</Box> :
			<SplitIconButton
				onClick={generate}
				isDisabled={!canGenerateReport.result}
				tooltipOnDisabled
				tooltipTitle="To Generate: "
				tooltipText={<CantGenerateTooltipText report={canGenerateReport}/>}
				tooltipSeverity="warning"
				aria-label="generate collage"
				icon={<SaveIcon fontSize="large"/>}
			>
				<MenuItem>
					<Button
						onClick={generate}
						startIcon={<SaveIcon/>}
						variant="text"
						sx={{ color: theme.palette.action.active }}
					>
						<Typography variant="button" color="text.primary">Save</Typography>
					</Button>
				</MenuItem>
				<MenuItem>
					<Button
						startIcon={<SaveAsIcon/>}
						variant="text"
						sx={{ color: theme.palette.action.active }}
					>
						<Typography variant="button" color="text.primary">Save As</Typography>
					</Button>
				</MenuItem>
			</SplitIconButton>
	);
};

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
