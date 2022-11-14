import { selector, useRecoilValue } from "recoil";
import { TRACKER_EXT } from "./familyTrackerAtom";

const createTrackerSelectorHook = ({ key, customGetter = null, atomsData }) => {
	const { atoms, metadata } = atomsData;

	const hookSelector = selector({
		key: key + TRACKER_EXT + "paramsSelector",
		get: ({ get }) => {
			//TODO: throw dev error when tracker name cant be found

			const trackerName = metadata[key]?.tracker;
			const trackerData = get(atoms[trackerName]);
			return customGetter ? customGetter(trackerData) : trackerData;
		}
	});

	const useHook = () => useRecoilValue(hookSelector);

	useHook.selector = hookSelector;

	return useHook;
};

export default createTrackerSelectorHook;
