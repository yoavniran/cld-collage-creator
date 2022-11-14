import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	isAppDrawerOpen
} = atoms;

const useAppDrawerStatus = createSelectorHook(
	"DrawerStatusSelector",
	isAppDrawerOpen,
);

export default useAppDrawerStatus;
