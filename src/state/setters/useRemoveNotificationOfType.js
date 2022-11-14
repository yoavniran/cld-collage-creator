import { createStateHookSetter } from "../../recoilUtils";
import atoms from "../store";

const { notifications } = atoms;

const useRemoveNotificationOfType = createStateHookSetter(
	"useRemoveNotificationOfType",
	(set, type) => {
		set(notifications, (prev) => prev.filter((msg) => msg.type !== type));
	},
);

export default useRemoveNotificationOfType;
