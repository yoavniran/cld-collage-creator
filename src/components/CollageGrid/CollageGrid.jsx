import { useEffect, useState } from "react";
import styled from "styled-components";
import SelectionArea from "@viselect/react";
import {
	useCollageCells,
	useCollageSize,
	useCollageBorder,
	useGetPhotoOverCell,
	useGenerating,
} from "../../state/selectors";
import CollageGridCell from "../CollageGridCell";
import GridXerox from "../GridXerox";
import useGridSelection from "./useGridSelection";
import { GridContainer } from "./gridStyles";

const StyledSelectionArea = styled(SelectionArea)`
	width: 100%;
`;

const SELECTION_PROPS = {
	selectables: ".grid-cell",
	behaviour: {
		startThreshold: 20,
	},
	features: {
		singleTap: {
			allow: false,
		}
	}
};

const CollageGrid = () => {
	const collageSize = useCollageSize();
	const cells = useCollageCells();
	const photoOverCell = useGetPhotoOverCell();
	const [color, width] = useCollageBorder();
	const { handlers: selectionHandlers, hovered } = useGridSelection();
	const isGenerating = useGenerating();
	const [isShowingXerox, setShowXerox] = useState(false);

	useEffect(() => {
		if (isGenerating) {
			setShowXerox(true);
		}
	}, [isGenerating]);

	console.log("RENDERING COLLAGE GRID", { color, width, cells, isGenerating, isShowingXerox });

	const onXeroxDone = () => setShowXerox(false);

	return (<StyledSelectionArea
		{...SELECTION_PROPS}
		{...selectionHandlers}
	>
		<GridContainer
			minWidth={300}
			maxWidth={1100}
			$color={color}
			$width={width}
			$photoOverCell={photoOverCell}
		>
			{
				isShowingXerox &&
					<GridXerox onAnimateFinish={(onXeroxDone)}/>
			}
			{
				cells
					.flat()
					.filter(({ override }) => override === null)
					.map((cell, index) =>
					<CollageGridCell
						{...cell}
						key={`${collageSize},${cell.id}`}
						className="grid-cell"
						isHovered={hovered.includes(cell.id)}
						cellIndex={index + 1}
					/>)
			}
		</GridContainer>
	</StyledSelectionArea>);
};

export default CollageGrid;
