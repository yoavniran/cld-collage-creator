import { useCallback } from "react";
import {
	isRecoilValue,
	selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";

export const createStateHookSetter = (key, setter) => {
	const stateSelector = selector({
		key,
		get: ({ get }) => null,
		set: ({ set, get /*, reset */ }, value) =>
			setter(set, value, get),
	});

	return () => useRecoilState(stateSelector)[1];
};

const createHookSelector = (key, getter, setter = null) => {
	const isGetterRecoilVal = isRecoilValue(getter),
		allowWrite = setter !== false && (setter || (!setter && isGetterRecoilVal));

	const hookSelector = selector({
		key,
		set: allowWrite ?
			({ get, set, reset }, newValue) =>
				setter || !isGetterRecoilVal ?
					//use custom setter
					setter(newValue, { get, set, reset }) :
					//set the new value to the atom
					set(getter, newValue) :
			undefined,
		get: ({ get }) => isGetterRecoilVal ?
			//get atom directly
			get(getter) :
			//execute getter callback
			getter(get),
	});

	return { allowWrite, hookSelector };
};

/**
 *
 * @param key
 * @param getter
 * @param setter must be provided in case getter isnt an Atom
 * @returns {function(): (T|(<T>(valOrUpdater: ((<T>(currVal: T) => T) | T)) => void))[]|T}
 */
export const createSelectorHook = (key, getter, setter = null) => {
	const { allowWrite, hookSelector } = createHookSelector(key, getter, setter);

	const useHook = () => allowWrite ?
		useRecoilState(hookSelector) :
		// [useRecoilValue(hookSelector), useSetRecoilState(hookSelector)] :
		useRecoilValue(hookSelector);
	useHook.selector = hookSelector;

	return useHook;
};

export const createGetSetHooks = (key, getter, setter) => {
	const { hookSelector } = createHookSelector(key, getter, setter);

	const useSetHook = () => useSetRecoilState(hookSelector);
	const useGetHook = () => useRecoilValue(hookSelector);

	return { useSetHook, useGetHook };
};

// export const createSimpleSetterHook = (atom, customSetter = undefined) =>
// 	() => {
// 		const recoilSetter = useSetRecoilState(atom);
//
// 		return useCallback((value) => {
// 			recoilSetter(customSetter ?
// 				(current) => customSetter(current, value) : value);
// 		}, [recoilSetter]);
// 	};
