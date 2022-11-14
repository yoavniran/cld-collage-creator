import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	notifications,
} = atoms;

const useNotifications = createSelectorHook(
	"NotificationsSelector",
	notifications,
);

export default useNotifications;
