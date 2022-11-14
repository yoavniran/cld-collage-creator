import { useDragDropManager } from "react-dnd";

//wrapper around the ugliness that react-dnd forces because it doesnt
//give access to the drag/drop events or the keyboard keys pressed during dnd
//requires the custom BE in ../DragDropBackend
const useDndKeyboardSupport = () => {
	const dndManager = useDragDropManager();

	return {
		areDragKeysPressed: (keys, all = false) => keys[all ? "every" : "some"]((key) =>
			!!dndManager.backend._currentDragEvent?.[key]),

		isDropShiftPressed: () => dndManager.backend._currentDropEvent?.shiftKey,
	};
};

export default useDndKeyboardSupport;

