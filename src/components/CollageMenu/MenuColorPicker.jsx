import styled from "styled-components";
import { HexColorPicker, HexColorInput } from "react-colorful";
import useThrottledCallback from "beautiful-react-hooks/useThrottledCallback";

const HexInputWrapper = styled.div`
  position: relative;
	
  &:before {
    content: "#";
    width: 12px;
    height: 40px;
	  line-height: 40px;
    position: absolute;
    display: inline-block;
    left: 6px;
	  top: 1px;
	  font-size: 1.2rem;
	  color: ${({ theme }) => theme.palette.primary.light};
  }
`;

const StyledHexInput = styled(HexColorInput)`
  height: 26px;
  font-size: 1.2rem;
	padding: 20px 6px 20px 16px;
  border-color: ${({ theme }) => theme.palette.divider};
	border-style: solid;
	border-width: 1px;
  border-radius: 4px;
	width: 200px;
	background-color: transparent;
	outline: none;
	color: ${({ theme }) => theme.palette.text.primary};
	
  &:focus-visible, &:hover {
    border-color: ${({ theme }) =>  theme.palette.text.primary};
  }
`;

const MenuColorPicker = ({ color, setColor }) => {
	const throttledSetColor = useThrottledCallback(setColor, [], 400);

	return (
		<>
			<HexColorPicker
				color={color}
				onChange={throttledSetColor}
			/>
			<HexInputWrapper>
			<StyledHexInput
				color={color}
				onChange={throttledSetColor}
			/>
			</HexInputWrapper>
		</>);
};

export default MenuColorPicker;
