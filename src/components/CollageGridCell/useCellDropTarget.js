import { useDrop } from "react-dnd";
import { DRAG_TYPES } from "../../consts";
import { useGridPhoto } from "../../state/selectors";
import { useSetPhotoOverCell } from "../../state/setters";
import useDndKeyboardSupport from "../hooks/useDndKeyboardSupport";

const ACCEPTED_TYPES = [DRAG_TYPES.PHOTO];

const useCellDropTarget = ({ id }) => {
	const setPhotoOverCell = useSetPhotoOverCell();
	const setGridPhoto = useGridPhoto()[1];
	const dndKeyboardSupport = useDndKeyboardSupport();

	const [{ isDragOver }, dropRef] = useDrop(
		() => ({
			accept: ACCEPTED_TYPES,
			drop: ({ photo, orgCellId }, monitor) => {
				const copy = dndKeyboardSupport.isDropShiftPressed();

				console.log("CELL BEING DROPPED ON  ", { photo, orgCellId, copy }, monitor.getItemType());

				if (monitor.getItemType() === DRAG_TYPES.PHOTO) {
					setGridPhoto(id, { photo, options: { orgCellId, copy } });
				}
			},
			// hover: (data, monitor) => { },
			canDrop: ({ cell: startCell }, monitor) => {
				return ACCEPTED_TYPES.includes(monitor.getItemType());
			},
			collect: (monitor) => {
				const isDragOver = !!monitor.isOver();

				if (isDragOver) {
					setPhotoOverCell(id);
				}

				return {
					isDragOver,
				};
			},
		}),
		[id],
	);

	return { isDragOver, dropRef };
};

export default useCellDropTarget;
