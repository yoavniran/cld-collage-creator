import atoms, { createRecoilHistoryHook } from "../store";

const {
	gridSize,
	borderColor,
	borderWidth,
	crop,
	gridCells,
	gridPhotos,
} = atoms;

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

