import { useState, useCallback } from "react";
import { useGridCellsCalculator } from "../../state/setters";

const convertElementsToIds = (elms) =>
	elms.map(v => v.dataset.id).map(Number);

const useGridSelection = () => {
	const [hovered, setHovered] = useState([]);
	const calcCells = useGridCellsCalculator();

	const onBeforeStart = ({ event }) => {
		//only allow selection with left mouse button and without ctrl/cmd
		return event.buttons === 1 && !event.metaKey && !event.ctrlKey;
	};

	const onStart = useCallback(({ selection }) => {
		//clear selection on start
		selection.clearSelection();
	}, []);

	const onMove = useCallback(({ store }) => {
		const { added, removed } = store.changed;

		if (added.length || removed.length) {
			const hoveredIds = convertElementsToIds(store.selected);
			setHovered(hoveredIds);
		}
	}, [hovered]);

	const onStop = useCallback(({ store }) => {
		if (store.selected.length > 1) {
			const selectedIds = convertElementsToIds(store.selected);
			const override = { selectedIds };

			calcCells({ override });
		}

		setHovered([]);
	}, []);

	return {
		handlers: {
			onBeforeStart,
			onStart,
			onMove,
			onStop,
		},
		hovered,
	};
};

export default useGridSelection;

