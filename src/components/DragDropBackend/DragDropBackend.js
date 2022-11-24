import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

//TODO: this is horrible but react-dnd doesnt provide access to the DOM event or to the keyboard keys pressed during the drag event :(
const createDragDropBackend = (manager, context, options) => {
	const h5be = HTML5Backend(manager, context, options);
	const customBE = Object.create(h5be);

	customBE.handleTopDragStart = (e) => {
		customBE._currentDragEvent = e;
		h5be.handleTopDragStart(e);
		customBE._currentDragEvent = null;
	};

	customBE.handleTopDrop = (e) => {
		customBE._currentDropEvent = e;
		h5be.handleTopDrop(e);
		customBE._currentDropEvent = null;
	};

	// customBE.handleTopDropCapture

	return customBE;
};

const getDndBackend = () => isMobile ? TouchBackend : createDragDropBackend;

export default getDndBackend;
