import { atom, atomFamily } from "recoil";
import { createTrackerAtom } from "./familyTrackerAtom";
import createSelectorFamilyHook from "./createSelectorFamilyHook";
import createTrackerSelectorHook from "./createTrackerSelectorHook";
import { useRecoilHistory } from "./history";
import createTransactionHookSetter  from "./createTransactionHookSetter";
import createCallbackSetter from "./createCallbackSetter";

const createSpring = (list) => {
	const atomsData = Object.entries(list)
		.reduce((res, [name, defaultValue]) => {
			const isFamily = name.endsWith("*");
			const cleanName = name.replace(/\*$/, "");

			let createFunction = isFamily ? atomFamily : atom;
			let tracker = isFamily ? createTrackerAtom(cleanName) : null;

			if (tracker) {
				res.metadata[tracker.name] = { name: tracker.name, fullName: tracker.name, isFamily: false, isTracker: true, tracked: cleanName };
				res.atoms[tracker.name] = tracker.atom;
			}

			res.metadata[cleanName] = { name: cleanName, fullName: name, isFamily, tracker: tracker?.name };
			res.atoms[cleanName] = createFunction({ key: cleanName, default: defaultValue });
			return res;
		}, { metadata: {}, atoms: {} });

	return {
		...atomsData,
		createSelectorFamilyHook: (options) =>
			createSelectorFamilyHook({ ...options, atomsData }),
		createTrackerSelectorHook: (options) =>
			createTrackerSelectorHook({ ...options, atomsData }),
		createRecoilHistoryHook: (options) => () =>
			useRecoilHistory({...options, atomsData }),
		createTransactionHookSetter: (options) =>
			createTransactionHookSetter({ ...options, atomsData }),
		createCallbackSetter: (options) =>
			createCallbackSetter({...options, atomsData }),

		//TODO useLocalStorageRecoilPersister

	};
};

export default createSpring;
