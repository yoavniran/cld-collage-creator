import atoms, { createRecoilHistoryHook } from "../store";

const {
	gridSize,
	borderColor,
	borderWidth,
	crop,
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
	],
});

export default useCollageHistory;

