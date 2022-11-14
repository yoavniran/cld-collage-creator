import { useRef } from "react";
import styled from "styled-components";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { MIN_SIZE, MAX_SIZE, MIN_BORDER, MAX_BORDER, MIN_DIM, MAX_DIM } from "../../state/store";
import { useGridCellsCalculator } from "../../state/setters";
import {
	useCollageSize,
	useCollageBorderColor,
	useCollageBorderWidth,
	useCloud,
	useCollagePreset,
	useUploadPreset,
	useIsSamePreset,
	useDimensions,
} from "../../state/selectors";
import MenuField from "./MenuField";
import MenuCategory from "./MenuCategory";
import MenuSlider from "./MenuSlider";
import MenuColorPicker from "./MenuColorPicker";
import TextField from "@mui/material/TextField";

//TODO: Add Gravity drop down
//TODO: add Crop drop down

const StyledList = styled(List)`
  .react-colorful {
    margin-top: 10px;
  }

  .MuiInputBase-readOnly {
    color: ${({ theme }) => theme.palette.text.disabled}
  }

  .MuiIconButton-edgeEnd {
    padding: 0;
  }
	
	.MuiTextField-root {
		width: 100%;
	}
`;

const CollageMenu = () => {
	const uploadRefInputRef = useRef(null);
	const size = useCollageSize();
	const [borderColor, setBorderColor] = useCollageBorderColor();
	const [borderWidth, setBorderWidth] = useCollageBorderWidth();
	const [cloud, setCloud] = useCloud();
	const [collagePreset, setCollagePreset] = useCollagePreset();
	const [uploadPreset, setUploadPreset] = useUploadPreset();
	const [isSamePreset, setIsSamePreset] = useIsSamePreset();
	const [dimensions, setDimensions] = useDimensions();
	const calcCells = useGridCellsCalculator();

	const calculateCellsOnResize = (newSize) => {
		calcCells({ size: newSize });
	};

	const toggleSamePreset = () => {
		setIsSamePreset(!isSamePreset);

		if (isSamePreset) {
			uploadRefInputRef.current?.focus();
		}
	};

	return <StyledList>
		<MenuCategory title="Grid" withDivider={false}>
			<MenuField title="Grid Size">
				<MenuSlider
					value={size}
					updateValue={calculateCellsOnResize}
					min={MIN_SIZE}
					max={MAX_SIZE}
				/>
			</MenuField>
			<MenuField title="Dimensions">
				<MenuSlider
					value={dimensions}
					updateValue={setDimensions}
					min={MIN_DIM}
					max={MAX_DIM}
					step={100}
				/>
			</MenuField>
			<MenuField title="Border Color">
				<MenuColorPicker color={borderColor} setColor={setBorderColor}/>
			</MenuField>
			<MenuField title="Border Width">
				<MenuSlider
					value={borderWidth}
					updateValue={setBorderWidth}
					min={MIN_BORDER}
					max={MAX_BORDER}
				/>
			</MenuField>
		</MenuCategory>

		<MenuCategory title="Settings">
			<MenuField>
				<TextField
					label="Cloud Name"
					value={cloud}
					variant="outlined"
					color="secondary"
					onChange={(e) => setCloud(e.target.value)}
				/>
			</MenuField>
			<MenuField>
				<TextField
					label="Collage Preset"
					value={collagePreset}
					variant="outlined"
					color="secondary"
					onChange={(e) => setCollagePreset(e.target.value)}
				/>
			</MenuField>
			<MenuField>
				<TextField
					inputRef={uploadRefInputRef}
					label="Upload Preset"
					value={isSamePreset ? collagePreset : uploadPreset}
					variant="outlined"
					color="secondary"
					onChange={(e) => setUploadPreset(e.target.value)}
					helperText={isSamePreset ? "Collage Preset is used for uploads" : ""}
					InputProps={{
						readOnly: isSamePreset,
						endAdornment:
							<InputAdornment position="end">
								<Tooltip
									title={isSamePreset ?
										"unlock to use a different upload preset" : "lock to use the collage preset for uploads"}
								>
									<IconButton
										size="small"
										aria-label="toggle same preset as collage"
										onClick={toggleSamePreset}
										edge="end"
									>
										{isSamePreset ? <LockIcon/> : <LockOpenIcon/>}
									</IconButton>
								</Tooltip>
							</InputAdornment>,
					}}
				/>
			</MenuField>

		</MenuCategory>
	</StyledList>;
};

export default CollageMenu;
