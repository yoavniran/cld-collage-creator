import { useRecoilTransaction_UNSTABLE as useRecoilTransaction } from "recoil";
import getTrackerSetters from "./familTrackerSetters";

const createTransactionHookSetter = ({ setter, atomsData }) =>
	 (deps = []) => useRecoilTransaction((actions) =>
		(...args) => {
			const trackerSetters = getTrackerSetters({
				...actions, atomsData,
			});

			setter({ ...actions, ...trackerSetters }, ...args);
		}, deps);

export default createTransactionHookSetter;
