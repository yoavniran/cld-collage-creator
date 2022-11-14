import { createGetSetHooks } from "../recoilUtils/recoilHelpers";
import atoms from "./store";

const {
	photoOverCell
} = atoms;

const {
	useSetHook: useSetPhotoOverCell,
	useGetHook: useGetPhotoOverCell,
} = createGetSetHooks("PhotoOverCellSelector", photoOverCell);

export {
	useSetPhotoOverCell,
	useGetPhotoOverCell,
};
