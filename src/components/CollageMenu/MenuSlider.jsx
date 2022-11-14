import styled from "styled-components";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const StyledStack = styled(Stack)`
  width: 100%;

  .incdecIcon {
    cursor: pointer;
  }
	
	.MuiSlider-root.MuiSlider-colorPrimary {
		color: ${({ theme }) => theme.palette.primary.light }
	}
`;

const MenuSlider = ({ value, updateValue, min = 0, max = 100, step = 1 }) => {
	return (
		<StyledStack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
			<RemoveIcon
				className="incdecIcon"
				onClick={() => {
					if (value > min) {
						updateValue(value - step);
					}
				}}
			/>
			<Slider
				color="primary"
				aria-label="Size"
				value={value}
				onChange={(e, value) => {
					updateValue(value);
				}}
				marks
				step={step}
				min={min}
				max={max}
				valueLabelDisplay="auto"
			/>
			<AddIcon
				className="incdecIcon"
				onClick={() => {
					if (value < max) {
						updateValue(value + step);
					}
				}}
			/>
		</StyledStack>
	);
};

export default MenuSlider;
