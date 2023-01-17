import { LS_KEY } from "../../consts";
import { useLocalStoragePersistence } from "recoil-spring";
import atoms from "../../state/store";

const {
	gridCells,
	isAppDrawerOpen,
	notifications,
	uploads,
	lastOverride,
	gridPhotos,
	photoOverCell,
	isGenerating,
	cloudEntryMode,
} = atoms;

const ignores = [
	gridCells,
	isAppDrawerOpen,
	notifications,
	uploads,
	lastOverride,
	gridPhotos,
	photoOverCell,
	isGenerating,
	cloudEntryMode
];

const StatePersister = () => {
	useLocalStoragePersistence({
		key: LS_KEY,
		ignore: ignores,
	});

	return null;
};

export default StatePersister
