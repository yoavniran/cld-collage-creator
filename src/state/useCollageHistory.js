import { useStateHistory } from "recoil-spring";
import atoms from "./store";

const {
	gridSize,
	width,
	borderColor,
	borderWidth,
	crop,
	gravity,
	gridCells,
	gridPhotos,
	photoOverCell,
} = atoms;

const historyAtoms = [
	gridSize,
	borderColor,
	borderWidth,
	crop,
	gridCells,
	gridPhotos,
	width,
	gravity,
];

//TODO: need to ignore Notifications on forward/back

const collageHistoryMutator = (mutable) => {
	if (mutable.getLoadable(photoOverCell).contents) {
		mutable.set(photoOverCell, null);
	}
};

const useCollageHistory = () =>
	useStateHistory({ include: historyAtoms, navMutator: collageHistoryMutator });

export default useCollageHistory;

