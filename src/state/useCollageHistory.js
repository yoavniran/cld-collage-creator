import atoms, { createRecoilHistoryHook } from "./store";

const {
	gridSize,
	width,
	borderColor,
	borderWidth,
	crop,
	gravity,
	gridCells,
	gridPhotos,
} = atoms;

//TODO: need to ignore Notifications on forward/back

const useCollageHistory = createRecoilHistoryHook({
	atoms: [
		gridSize,
		borderColor,
		borderWidth,
		crop,
		gridCells,
		gridPhotos,
		width,
		gravity,
	],
});

export default useCollageHistory;

