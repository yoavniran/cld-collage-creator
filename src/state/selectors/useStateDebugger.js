import isString from "lodash/isString";
import { createSelectorHook } from "recoil-spring";
import { spring } from "../../state/store";

const useStateDebugger = createSelectorHook(
	"stateDebuggerSelector",
	(get, getCallback) =>
		getCallback(
			({ snapshot }) => (atom) =>
				snapshot
					.getLoadable(isString(atom) ?
						spring.getAtom(atom) :
						atom)
					.contents,
		),
	false,
);

export default useStateDebugger;
