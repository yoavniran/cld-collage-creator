import { useEffect } from "react";
import {
	isRecoilValue,
	useRecoilTransactionObserver_UNSTABLE as useRecoilTransactionObserver,
} from "recoil";
import { logger } from "../../utils";
import atoms from "../../state/store";
import { useDebug, useStateDebugger } from "../../state/selectors";

const {
	cloud,
	collagePreset,
	uploadPreset,
} = atoms;

const StateLogger = () => {
	const getFromState = useStateDebugger();
	const [isDebug] = useDebug();

	useEffect(() => {
		//helper method for debug purposes
		window._getFromState = getFromState;

		//helper method for documentation
		window._getHiddenCloudUrl = () => {
			const cloudVal = getFromState(cloud),
				collagePresetVal = getFromState(collagePreset),
				uploadPresetVal = getFromState(uploadPreset) || collagePresetVal;

			const loc = document.location;
			return `${loc.origin}?cloudEntryMode=hidden&cloud=${encodeURIComponent(cloudVal)}&collagePreset=${encodeURIComponent(collagePresetVal)}&uploadPreset=${encodeURIComponent(uploadPresetVal)}`;
		};
	}, [getFromState]);

	useEffect(() => {
		logger.setDebug(isDebug);
	}, [isDebug]);

	useRecoilTransactionObserver(({ snapshot }) => {
		if (isDebug) {
			const data = Object.entries(atoms)
				.reduce((res, [key, value]) => {
					if (isRecoilValue(value)) {
						res[key] = snapshot.getLoadable(value).contents;
					}
					return res;
				}, {});

			logger.log("### UPDATED STATE:");
			logger.table(data, ["Value"]);
		}
	});

	return null;
};

export default StateLogger;

