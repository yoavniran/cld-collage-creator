import { memo } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { addUrlTransformation } from "../../utils";
import { useCollageSize, useGridPhoto } from "../../state/selectors";
import useAsPhotoDragSource from "../hooks/useAsPhotoDragSource";
import CellActions from "./CellActions"
import useCellDropTarget from "./useCellDropTarget";
import useCellBorderCss from "./useCellBorderCss";

const CellContainer = styled(Box)`
  position: absolute;
  ${({ $x, $y }) => `
		left: ${$x}%;
		top: ${$y}%;
	`}
	
	${({ $borderCss }) => $borderCss}
`;

const CellSurface = styled(Paper)`
  width: 100%;
  height: 100%;
  border-radius: 0;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
	
  ${({ $hovered }) => $hovered ?
          `filter: grayscale(50%) blur(4px) brightness(70%) opacity(40%) contrast(150%);` :
          ""}
`;

const CollageGridCell = memo((
	{
		cellIndex,
		id,
		columns,
		rows,
		position,
		color,
		className,
		overrideTargets,
		isHovered,
	}) => {
	const size = useCollageSize();
	const baseUnit = 100 / size;
	const width = baseUnit * columns;
	const height = baseUnit * rows;
	const [photo] = useGridPhoto(id);
	const borderCss = useCellBorderCss({ position });
	const { dragRef } = useAsPhotoDragSource({ photo, onlyWithKeys: ["metaKey", "ctrlKey"], orgCellId: id });
	const { dropRef } = useCellDropTarget({ id });
	const ref = (node) => dragRef(dropRef(node));

	return (<CellContainer
		data-id={id}
		height={`${height}%`}
		width={`${width}%`}
		className={className}
		$x={position[1] * baseUnit}
		$y={position[0] * baseUnit}
		$borderCss={borderCss}
		ref={ref}
	>
		<CellSurface
			sx={{ background: photo ? `url(${ addUrlTransformation(photo.url, "$&/h_300,dpr_2,g_auto,c_fill/")})` : color }}
			elevation={1}
			$hovered={isHovered}
		>
			<CellActions
				cellRef={ref}
				id={id}
				presentationId={cellIndex}
				isOverriding={!!overrideTargets.length}
				hasPhoto={!!photo}
			/>
		</CellSurface>
	</CellContainer>);
});

export default CollageGridCell;
