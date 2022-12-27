import { createGetSetHooks } from "recoil-spring";
import atoms from "./store";

const {
	photoOverCell,
} = atoms;

const {
	useSetHook: useSetPhotoOverCell,
	useGetHook: useGetPhotoOverCell,
} = createGetSetHooks(photoOverCell);

export {
	useSetPhotoOverCell,
	useGetPhotoOverCell,
};
