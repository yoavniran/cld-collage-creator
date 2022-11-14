import { updateAtomTracker } from "./familyTrackerAtom";

const getTrackerSetters = ({ set, reset, atomsData }) => {
	const setWithTracker = (atom, val) => {
		updateAtomTracker(atomsData, atom, (trackerName, param) => {
			console.log("!!!!!! SETTING WITH TRACKER !!!! ", { atom, val, trackerName, param });
			set(atomsData.atoms[trackerName], (prev) =>
				prev.includes(param) ? prev : [param, ...prev]);
		});

		set(atom, val);
	};

	const resetWithTracker = (atom) => {
		updateAtomTracker(atomsData, atom, (trackerName, param) => {
			console.log("!!!!!! RESETTING WITH TRACKER !!!! ", { atom, trackerName, param });
			set(atomsData.atoms[trackerName], (prev) => {
				const indx = prev.indexOf(param);
				return ~indx ? [...prev.slice(0, indx), ...prev.slice(indx + 1)] : prev;
			});
		});

		reset(atom);
	};

	return {
		set: setWithTracker,
		reset: resetWithTracker,
	};
};

export default getTrackerSetters;
