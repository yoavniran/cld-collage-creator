import { createFamilyTrackerSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	pollingReqs,
} = atoms;

const usePollingRequests = createFamilyTrackerSelectorHook(pollingReqs);

export default usePollingRequests;
