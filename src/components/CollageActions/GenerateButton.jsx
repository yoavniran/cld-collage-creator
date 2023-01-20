import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useCollageGenerator } from "../../state/setters";
import { useCanGenerate, useGenerating, useIsDarkMode } from "../../state/selectors";
import GutterCircleProgress from "../GutterCircleProgress";
import useAppTheme from "../../styles/useAppTheme";
import SplitIconButton from "../SplitIconButton";
import SaveAsModal from "./SaveAsModal";
import ManifestModal from "./ManifestModal";

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
	const [isShowingSaveAs, setShowingSaveAs] = useState(false);
	const [isShowingManifest, setShowingManifest] = useState(false);
	const generate = useCollageGenerator();
	const isGenerating = useGenerating();
	const canGenerateReport = useCanGenerate();
	const isDisabled = !canGenerateReport.result;
	const isDarkMode = useIsDarkMode();
	const theme = useAppTheme();

	const onGenerateWithId = () => {
		setShowingSaveAs(true);
	};

	const onSaveAsClose = (data) => {
		setShowingSaveAs(false);

		if (data) {
			generate({ id: data.pid });
		}
	};

	const onShowManifest = () => {
		setShowingManifest(true);
	};

	const onManifestClose = (generate) => {
		setShowingManifest(false);

		if (generate) {
			onGenerateWithId();
		}
	};

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
			<>
				<SplitIconButton
					onClick={generate}
					isDisabled={isDisabled}
					tooltipOnDisabled
					badgeShowOnDisabled
					tooltipTitle={isDisabled && "To Generate: "}
					tooltipText={isDisabled && <CantGenerateTooltipText report={canGenerateReport}/>}
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
							onClick={onGenerateWithId}
							startIcon={<SaveAsIcon/>}
							variant="text"
							sx={{ color: theme.palette.action.active }}
						>
							<Typography variant="button" color="text.primary">Save As</Typography>
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							onClick={onShowManifest}
							startIcon={<DataObjectIcon/>}
							variant="text"
							sx={{ color: theme.palette.action.active }}
						>
							<Typography variant="button" color="text.primary">Manifest</Typography>
						</Button>
					</MenuItem>
				</SplitIconButton>

				{isShowingSaveAs && <SaveAsModal onClose={onSaveAsClose}/>}
				{isShowingManifest && <ManifestModal onClose={onManifestClose}/>}
			</>
	);
};

export default GenerateButton;
