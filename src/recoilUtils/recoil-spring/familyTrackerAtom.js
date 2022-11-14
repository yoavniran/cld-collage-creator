import { atom } from "recoil";
import isString from "lodash/isString";
import { getAtomFamilyRootName } from "./utils";

const TRACKER_EXT = "$$tracker";

const getTrackerAtomName = (name) => name + TRACKER_EXT;

const getTrackerForAtom = (atom, atoms) => isString(atom) ?
	atoms[getTrackerAtomName(atom)] : atoms[getTrackerAtomName(getAtomFamilyRootName(atom))];

const createTrackerAtom = (name) => {
	const trackerName = getTrackerAtomName(name);
	//for family create a tracker atom
	const trackerAtom = atom({ key: trackerName, default: [] });

	return { name: trackerName, atom: trackerAtom }
};

const findTrackerNameInStore = (name, { metadata }) => {
	const atomMeta = metadata[name];
	return atomMeta?.tracker;
};

export {
	TRACKER_EXT,
	createTrackerAtom,
	getTrackerAtomName,
	findTrackerNameInStore,
	getTrackerForAtom
};
