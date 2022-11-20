import { useRecoilCallback } from "recoil";
import getTrackerSetters from "./familTrackerSetters";

const createCallbackSetter = ({ setter, atomsData }) =>
	(deps = []) => useRecoilCallback((actions) => {
		const get = (loadable) =>
			//TODO: might not be loaded yet...
			actions.snapshot.getLoadable(loadable).contents;

		return (...args) => {
			const trackerSetters = getTrackerSetters({
				...actions, atomsData,
			});

			return setter({ ...actions, ...trackerSetters, get }, ...args);
		};
	}, deps);

export default createCallbackSetter;
