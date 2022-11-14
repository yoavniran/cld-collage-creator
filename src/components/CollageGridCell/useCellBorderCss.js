import { useCollageBorder, useCollageSize } from "../../state/selectors";

const useCellBorderCss = ({ position }) => {
	const size = useCollageSize();
	const [color, width] = useCollageBorder();
	const [row, col] = position;

	const isRightBorder = (col + 1) < size,
		isBottomBorder = (row + 1) < size;

	return `
		border-right: ${isRightBorder ? `${color} ${width}px solid` : "0"};
		border-bottom: ${isBottomBorder ? `${color} ${width}px solid` : "0"};		
	`;
};

export default useCellBorderCss;
