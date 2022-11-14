import {
	isRecoilValue,
	useRecoilTransactionObserver_UNSTABLE as useRecoilTransactionObserver,
} from "recoil";
import atoms from "../../state/store";

const StateLogger = () => {
	useRecoilTransactionObserver(({ snapshot }) => {
		const data = Object.entries(atoms)
			.reduce((res, [key, value]) => {
				if (isRecoilValue(value)) {
					res[key] = snapshot.getLoadable(value).contents;
				}
				return res;
			} , {})

		// eslint-disable-next-line no-console
		console.log("### UPDATED STATE:");
		// eslint-disable-next-line no-console
		console.table(data, ["Value"]);
	});

	return null;
};

export default StateLogger;

