import { useRecoilTransactionObserver_UNSTABLE as useRecoilTransactionObserver } from "recoil";

//TODO: support include list (not just ignore)

const getIsTrackedIgnored = (key, ignore, spring) => {
	const { atoms, metadata } = spring;
	const trackedName = metadata[key].isTracker && metadata[key].tracked;

	return trackedName &&
		(ignore.includes(trackedName) || ignore.includes(atoms[trackedName]));
};

const getIsIgnored = (key, value, ignore, spring)  => {
	return ignore.includes(key) ||
		ignore.includes(value) ||
		getIsTrackedIgnored(key, ignore, spring);
};

const getNewPrevContent = (atom, snapshot, prevSnapshot) => {
	const newContent = snapshot.getLoadable(atom).contents,
		prevContent = prevSnapshot.getLoadable(atom).contents;

	return {
		next: newContent,
		prev: prevContent,
		isDiff: prevContent !== newContent
	};
};

const getFamilyContent = (key, trackerIds, snapshot, spring) => {
	const { atoms } = spring;
	const family = atoms[key];

	return trackerIds.reduce((res, id) => {
		res[id] = snapshot.getLoadable(family(id)).contents;
		return res;
	}, {});
} ;

const useLocalStorageRecoilPersister = ({ lsKey, spring, ignore }) => {
	const { atoms, metadata } = spring;

	useRecoilTransactionObserver(({ snapshot, previousSnapshot }) => {
		let hasChangesFromPrevious = false;

		const data = Object.entries(atoms)
			.reduce((res, [key, value]) => {
				if (!ignore || !getIsIgnored(key, value, ignore, spring)) {
					let content;

					if (metadata[key].isFamily) {
						//use tracker to persist family data
						const trackerName = metadata[key].tracker;
						content = getNewPrevContent(atoms[trackerName], snapshot, previousSnapshot);
						res[key] = getFamilyContent(key, content.next, snapshot, spring);
					} else {
						content = getNewPrevContent(value, snapshot, previousSnapshot);
						res[key] = content.next;
					}

					if (content.isDiff) {
						hasChangesFromPrevious = true;
					}
				}

				return res;
			}, {});

		if (hasChangesFromPrevious) {
			try {
				localStorage.setItem(lsKey, JSON.stringify(data));
			} catch (ex) {
				//TODO: replace with invariant/warning pkg
				console.warn("FAILED TO PERSIST RECOIL DATA TO LS", ex);
			}
		}
	});
};

export default useLocalStorageRecoilPersister;
