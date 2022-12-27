import { createSetterHook } from "recoil-spring";
import atoms from "../store";

const { notifications } = atoms;

const useRemoveNotificationOfType = createSetterHook(
	({ set }, type) => {
		set(notifications, (prev) => prev.filter((msg) => msg.type !== type));
	});

export default useRemoveNotificationOfType;
