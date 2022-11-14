import isNil from "lodash/isNil";
import { isRecoilValue, selectorFamily, useRecoilCallback, useRecoilValue } from "recoil";
import { findTrackerNameInStore } from "./familyTrackerAtom";
import { getAtomFamilyParts } from "./utils";

// CANT SUPPORT ATOM KEYS WITH DOUBLE __ because recoil uses this as separator! (What does recoil do if you use it?)

//TODO: Need to support all valid param types - https://recoiljs.org/docs/api-reference/utils/atomFamily#parameter-type
//TODO: in case setter is a selector, we cant make use of the tracker! need to warn about this
//TODO: Need to support useResetRecoilState - https://recoiljs.org/docs/api-reference/core/useResetRecoilState

const updateAtomTracker = (atomsData, atom, fn) => {
	if (atomsData) {
		//update tracker with new key to track
		const familyKeyParts = getAtomFamilyParts(atom);

		if (familyKeyParts.length > 1) {
			const atomName = familyKeyParts[0];
			const trackerName = findTrackerNameInStore(atomName, atomsData);

			if (trackerName && familyKeyParts[1]) {
				const param = JSON.parse(familyKeyParts[1]);
				fn(trackerName, param);
			}
		}
	}
};

const getCustomSelectorSetters = ({ set, reset, atomsData }) => {
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

const createSelector = ({ key, allowWrite, getter, setter, isGetterRecoilVal, atomsData }) => {
	return selectorFamily({
		key,
		set: allowWrite ?
			(param) => ({ get, set, reset }, newValue) => {

				const trackerSetters = getCustomSelectorSetters({
					set, reset, atomsData,
				});

				return setter ?
					//use custom setter
					setter(param, newValue, { get, set: trackerSetters.set, reset: trackerSetters.reset }) :
					//set the new value for the family member
					trackerSetters.set(getter(param), newValue);
			} :
			undefined,

		get: (param) => ({ get }) => isGetterRecoilVal ?
			//get family member directly
			get(getter(param)) :
			//use custom getter
			getter(param, get),
	});
};

const createSelectorFamilyHook = ({ key, getter, setter, atomsData = null }) => {
	const isGetterRecoilVal = isRecoilValue(getter),
		allowWrite = (setter !== false);

	const selector = createSelector({
		key,
		allowWrite,
		getter,
		setter,
		isGetterRecoilVal,
		atomsData
	});

	const useHook = (hookParam) =>
		!allowWrite ?
			//read only
			useRecoilValue(selector(hookParam)) :
			//use callback to be able to return value, setter tuple
			useRecoilCallback(({ set }) => (autoParam) => {
				return [
					!isNil(autoParam) && useRecoilValue(selector(autoParam)),
					(...args) => {
						const param = autoParam || args[0];
						set(selector(param), args.length === 1 ? args[0] : args[1]);
					},
				];
			}, [])(hookParam);

	useHook.selector = selector;

	return useHook;
};

export default createSelectorFamilyHook;
