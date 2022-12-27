import { createSelectorHook } from "recoil-spring";
import atoms from "../store";

const {
	notifications,
} = atoms;

const useNotifications = createSelectorHook(notifications);

export default useNotifications;
