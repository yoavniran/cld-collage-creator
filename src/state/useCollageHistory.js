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

const useCollageHistory = () =>
	useStateHistory({ include: historyAtoms });

export default useCollageHistory;

