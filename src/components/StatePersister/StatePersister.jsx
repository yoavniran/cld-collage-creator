import { LS_KEY } from "../../consts";
import { useLocalStorageRecoilPersister } from "../../recoilUtils/recoil-spring";
import atoms, { spring } from "../../state/store";

const {
	gridCells,
	isAppDrawerOpen,
	notifications,
	uploads,
	lastOverride,
	gridPhotos,
	photoOverCell,
	isGenerating,
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
];

const StatePersister = () => {
	useLocalStorageRecoilPersister({
		spring,
		ignore: ignores,
		lsKey: LS_KEY,
	});

	return null;
};

export default StatePersister
