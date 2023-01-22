import { createSelectorHookWithKey } from "recoil-spring";
import atoms from "../store";
import { getIsRequestExpired } from "../setters/useCollagesPoller";

const {
	pollingReqs
} = atoms;

const useIsPollingCollages = createSelectorHookWithKey(
	"IsPollingCollagesSelector",
	(get, getCallback, getTracker) => {
		const reqsIds = getTracker(pollingReqs);

		return !!reqsIds.find((id) =>
			 !getIsRequestExpired(get(pollingReqs(id))));
	},
	false,
);

export default useIsPollingCollages;
