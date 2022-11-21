import { logger } from "../../utils";
import { findTrackedAtom, updateAtomTracker } from "./familyTrackerAtom";

const getTrackerSetters = ({ get, set, reset, atomsData }) => {
	const setWithTracker = (atom, val) => {
		updateAtomTracker(atomsData, atom, (trackerName, param) => {
			logger.log("!!!!!! SETTING WITH TRACKER !!!! ", { atom, val, trackerName, param });
			set(atomsData.atoms[trackerName], (prev) =>
				prev.includes(param) ? prev : [param, ...prev]);
		});

		set(atom, val);
	};

	const resetWithTracker = (atom) => {
		updateAtomTracker(atomsData, atom, (trackerName, param) => {
			logger.log("!!!!!! RESETTING WITH TRACKER !!!! ", { atom, trackerName, param });
			set(atomsData.atoms[trackerName], (prev) => {
				const indx = prev.indexOf(param);
				return ~indx ? [...prev.slice(0, indx), ...prev.slice(indx + 1)] : prev;
			});
		});

		reset(atom);
	};

	const resetFamily = (familyTracker) => {
		const tracker = get(familyTracker);
		const rootAtom = findTrackedAtom(familyTracker, atomsData);

		tracker.forEach((index) => reset(rootAtom(index)));

		reset(familyTracker);
	};

	return {
		set: setWithTracker,
		reset: resetWithTracker,
		resetFamily,
	};
};

export default getTrackerSetters;
