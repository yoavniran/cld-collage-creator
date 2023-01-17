import { useRef } from "react";
import startCase from "lodash/startCase";
import styled from "styled-components";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
	MIN_SIZE,
	MAX_SIZE,
	MIN_BORDER,
	MAX_BORDER,
	MIN_DIM,
	MAX_DIM,
	GRAVITY_TYPES,
	CROP_TYPES,
	CLOUD_ENTRY_MODE,
} from "../../consts";
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
	useCropType,
	useGravityType,
	useCloudEntryMode,
} from "../../state/selectors";
import FieldHelperText from "../FieldHelperText";
import MenuField from "./MenuField";
import MenuCategory from "./MenuCategory";
import MenuSlider from "./MenuSlider";
import MenuColorPicker from "./MenuColorPicker";
import MenuSelect from "./MenuSelect";

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

  .MuiFormControl-root {
    margin-bottom: 10px;
  }

  .MuiFormHelperText-root {
    margin-top: 0;
  }
`;

const GridSizeField = () => {
	const size = useCollageSize();
	const calcCells = useGridCellsCalculator();

	const calculateCellsOnResize = (newSize) => {
		calcCells({ size: newSize });
	};

	return (
		<MenuField title="Grid Size">
			<MenuSlider
				value={size}
				updateValue={calculateCellsOnResize}
				min={MIN_SIZE}
				max={MAX_SIZE}
			/>
		</MenuField>
	);
};

const DimensionsField = () => {
	const [dimensions, setDimensions] = useDimensions();
	return (
		<MenuField title="Dimensions">
			<MenuSlider
				value={dimensions}
				updateValue={setDimensions}
				min={MIN_DIM}
				max={MAX_DIM}
				step={100}
			/>
		</MenuField>
	);
};

const BorderColorField = () => {
	const [borderColor, setBorderColor] = useCollageBorderColor();
	return (
		<MenuField title="Border Color">
			<MenuColorPicker color={borderColor} setColor={setBorderColor}/>
		</MenuField>
	);
};

const BorderWidthField = () => {
	const [borderWidth, setBorderWidth] = useCollageBorderWidth();
	return (
		<MenuField title="Border Width">
			<MenuSlider
				value={borderWidth}
				updateValue={setBorderWidth}
				min={MIN_BORDER}
				max={MAX_BORDER}
			/>
		</MenuField>
	);
};

const CloudSettingsCategory = () => {
	const entryMode = useCloudEntryMode(),
		isLocked = entryMode === CLOUD_ENTRY_MODE.LOCKED;

	return (
		entryMode !== CLOUD_ENTRY_MODE.HIDDEN &&
		<MenuCategory title="Settings">
			<CloudNameField isCloudLocked={isLocked}/>
			<PresetFields isCloudLocked={isLocked}/>
		</MenuCategory>
	);
};

const CloudNameField = ({ isCloudLocked }) => {
	const [cloud, setCloud] = useCloud();

	return (
		<MenuField>
			<TextField
				label="Cloud Name"
				value={cloud}
				variant="outlined"
				color="secondary"
				onChange={(e) => setCloud(e.target.value)}
				InputProps={{
					readOnly: isCloudLocked,
				}}
			/>
		</MenuField>
	);
};

const PresetFields = ({ isCloudLocked }) => {
	const uploadRefInputRef = useRef(null);
	const [collagePreset, setCollagePreset] = useCollagePreset();
	const [uploadPreset, setUploadPreset] = useUploadPreset();
	const [isSamePreset, setIsSamePreset] = useIsSamePreset();

	const toggleSamePreset = () => {
		setIsSamePreset(!isSamePreset);

		if (isSamePreset) {
			uploadRefInputRef.current?.focus();
		}
	};

	return (
		<>
			<MenuField>
				<TextField
					label="Collage Preset"
					value={collagePreset}
					variant="outlined"
					color="secondary"
					onChange={(e) => !isCloudLocked && setCollagePreset(e.target.value)}
					helperText={<FieldHelperText text="The preset to use when creating the collage"/>}
					InputProps={{
						readOnly: isCloudLocked,
					}}
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
					helperText={<FieldHelperText
						text={isSamePreset ? "Collage Preset is used for image uploads" : "The preset to use for image uploads"}/>
					}
					InputProps={{
						readOnly: isCloudLocked || isSamePreset,
						endAdornment:
							(isCloudLocked ? undefined : <InputAdornment position="end">
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
							</InputAdornment>),
					}}
				/>
			</MenuField>
		</>

	);
};

const CropField = () => {
	const [crop, setCrop] = useCropType();

	return (
		<MenuField>
			<MenuSelect
				label="Crop"
				value={crop}
				onChange={setCrop}
			>
				{CROP_TYPES.map((ct) =>
					<MenuItem key={ct} value={ct}>{startCase(ct)}</MenuItem>)}
			</MenuSelect>
		</MenuField>
	);
};

const GravityField = () => {
	const [gravity, setGravity] = useGravityType();

	return (
		<MenuField>
			<MenuSelect
				label="Gravity"
				value={gravity}
				onChange={setGravity}
			>
				{GRAVITY_TYPES.map((gt) =>
					<MenuItem key={gt} value={gt}>{startCase(gt)}</MenuItem>)}
			</MenuSelect>
		</MenuField>
	);
};

const CollageMenu = () => {
	return <StyledList>
		<MenuCategory title="Grid" withDivider={false}>
			<GridSizeField/>
			<DimensionsField/>
			<BorderColorField/>
			<BorderWidthField/>
		</MenuCategory>

		<MenuCategory title="Defaults">
			<CropField/>
			<GravityField/>
		</MenuCategory>

		<CloudSettingsCategory/>
	</StyledList>;
};

export default CollageMenu;
