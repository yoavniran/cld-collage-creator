import { useCallback } from "react";
import {
	isRecoilValue,
	useRecoilTransactionObserver_UNSTABLE as useRecoilTransactionObserver,
} from "recoil";
import { findTrackerNameInStore } from "../familyTrackerAtom";
import { getAtomFamilyRootName } from "../utils";
import useRecoilTimeTravel from "./useRecoilTimeTravel";

const DEFAULT_MAX_ITEMS = 10;

const getAtomsForDiff = (atoms, atomsData) => {
	return !atomsData ? atoms : atoms.map((a) => {
		return isRecoilValue(a) ? a :
			atomsData.atoms[findTrackerNameInStore(getAtomFamilyRootName(a), atomsData)];
	});
};

const getHasDiffs = (snapshot, prevSnapshot, atoms) => {
	return (!prevSnapshot && snapshot) ||
		!!atoms.find((a) => {
			const res = snapshot.getLoadable(a).contents !== prevSnapshot.getLoadable(a).contents;
			if (res) {
				console.log("FOUND SNAPSHOT DIFF FOR HISTORY ", a);
			}
			return res;
		});
};

const useRecoilHistory = ({ atoms, maxItems = DEFAULT_MAX_ITEMS, navMutator = null, atomsData = null }) => {
	const diffAtoms = getAtomsForDiff(atoms, atomsData);

	const {
		doTimeTravel,
		addHistory,
		counters,
	} = useRecoilTimeTravel({ atoms: diffAtoms, navMutator, maxItems, atomsData });

	useRecoilTransactionObserver(({ snapshot, previousSnapshot }) => {
		const id = snapshot.getID();

		if (id !== previousSnapshot?.getID()) {
			if (getHasDiffs(snapshot, previousSnapshot, diffAtoms)) {
				addHistory(previousSnapshot, snapshot);
			}
		}
	});

	const goForward = useCallback(() => doTimeTravel(1), [doTimeTravel]);
	const goBack = useCallback(() => doTimeTravel(-1), [doTimeTravel]);

	return {
		previousCount: counters[0],
		nextCount: counters[1],
		goForward,
		goBack,
	};
};

export default useRecoilHistory;
