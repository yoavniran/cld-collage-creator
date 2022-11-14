import { HexColorPicker } from "react-colorful";
import useThrottledCallback from "beautiful-react-hooks/useThrottledCallback";

const MenuColorPicker = ({ color, setColor }) => {
	const throttledSetColor = useThrottledCallback(setColor, [], 400);

	return (
		<HexColorPicker
			color={color}
			onChange={throttledSetColor}
		/>);
};

export default MenuColorPicker;
