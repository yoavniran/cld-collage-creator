import { createSelectorFamilyHook } from "recoil-spring";
import atoms from "../store";

const {
	pollingReqs
} = atoms;

const usePollingRequest = createSelectorFamilyHook(
	pollingReqs,
	false
);

export default usePollingRequest;
