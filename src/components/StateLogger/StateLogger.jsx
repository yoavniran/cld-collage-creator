import {
	isRecoilValue,
	useRecoilTransactionObserver_UNSTABLE as useRecoilTransactionObserver,
} from "recoil";
import atoms from "../../state/store";
import { useDebug } from "../../state/selectors";

const StateLogger = () => {
	const [isDebug] = useDebug();

	useRecoilTransactionObserver(({ snapshot }) => {
		if (isDebug) {
			const data = Object.entries(atoms)
				.reduce((res, [key, value]) => {
					if (isRecoilValue(value)) {
						res[key] = snapshot.getLoadable(value).contents;
					}
					return res;
				}, {});

			// eslint-disable-next-line no-console
			console.log("### UPDATED STATE:");
			// eslint-disable-next-line no-console
			console.table(data, ["Value"]);
		}
	});

	return null;
};

export default StateLogger;

