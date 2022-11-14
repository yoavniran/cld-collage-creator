import { useState, useCallback, useEffect, useRef } from "react";
import { useGotoRecoilSnapshot } from "recoil";
import { getTrackerAtomName } from "../familyTrackerAtom";
import { getAtomFamilyRootName } from "../utils";

const getIsMergableNode = (node, atoms, atomsData) => {
	let isMergable = atoms.includes(node);

	if (!isMergable) {
		//check if tracker was provided for a family atom
		const trackerName = getTrackerAtomName(getAtomFamilyRootName(node));
		const trackerAtom = atomsData.atoms[trackerName];

		isMergable = !!trackerAtom && atoms.includes(trackerAtom);
	}

	return isMergable;
};

const getTargetSnapshot = (currentSnapshot, nextSnapshot, { atoms, mutator, merge, atomsData }) => {
	const targetSnapshot = merge ? currentSnapshot : nextSnapshot;

	return !merge && !mutator ?
		targetSnapshot :
		targetSnapshot.map((mutable) => {
			if (merge) {
				const changedNodesItr = currentSnapshot.getNodes_UNSTABLE();

				for (let node of changedNodesItr) {
					if (getIsMergableNode(node, atoms, atomsData)) {
						//merge the value from the target snapshot
						mutable.set(node, nextSnapshot.getLoadable(node).contents);
					}
				}
			}

			//allow mutations of the snapshot before its applied
			mutator?.(mutable);
		});
};

const useRecoilTimeTravel = ({ atoms, maxItems, atomsData, navMutator = null, merge = true }) => {
	const [previous, setPrevious] = useState([]);
	const [next, setNext] = useState([]);
	const [current, setCurrent] = useState(null);
	const releasers = useRef(new Map());
	const gotoSnapshot = useGotoRecoilSnapshot();

	const retainSnapshot = (snapshot) => {
		const release = snapshot.retain();
		const id = snapshot.getID();

		if (releasers.current.has(id)) {
			releasers.current.get(id)();
		}

		releasers.current.set(id, release);
	};

	useEffect(() => {
		const all = next.concat(previous).concat(current || [])
			.map((snap) => snap.getID());

		releasers.current
			.forEach((release, id) => {
				if (!all.includes(id)) {
					//release snapshot no longer tracked by history
					release();
					releasers.current.delete(id);
				}
			});

	}, [next, previous, current]);

	const doTimeTravel = useCallback((direction) => {
		const dirSnapshots = direction < 0 ? previous : next;

		if (dirSnapshots.length) {
			const snapshot = dirSnapshots.slice(0, 1)[0],
				subtract = direction < 0 ? setPrevious : setNext,
				add = direction < 0 ? setNext : setPrevious;

			subtract((prev) => prev.slice(1));
			add((prev) => [current, ...prev]);

			const targetSnapshot = getTargetSnapshot(current, snapshot, {
				atoms,
				atomsData,
				navMutator,
				merge,
			});

			retainSnapshot(targetSnapshot);

			setCurrent(targetSnapshot);
			gotoSnapshot(targetSnapshot);
		}
	}, [previous, next, current]);

	const addHistory = (prevSnap, nextSnap) => {
		//store the previous snapshot in the history
		retainSnapshot(prevSnap);

		setPrevious((prev) => [prevSnap, ...prev.slice(0, (maxItems - 1))]);

		//clear next snapshots on a new (non-historical) snapshot
		setNext([]);

		//store the current snapshot as our "present"
		retainSnapshot(nextSnap);
		setCurrent(nextSnap);
	};

	return {
		addHistory,
		doTimeTravel,
		counters: [previous.length, next.length],
	};
};

export default useRecoilTimeTravel;
