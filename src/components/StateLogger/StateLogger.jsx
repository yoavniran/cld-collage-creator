import {
	isRecoilValue,
	useRecoilTransactionObserver_UNSTABLE as useRecoilTransactionObserver,
} from "recoil";
import { logger } from "../../utils";
import atoms from "../../state/store";
import { useDebug } from "../../state/selectors";

const StateLogger = () => {
	const [isDebug] = useDebug();
	logger.setDebug(isDebug);

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

