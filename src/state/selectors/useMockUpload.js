import atoms from "../store";
import { createSelectorHook } from "../../recoilUtils";

const {
	isMockUpload
} = atoms;

const useMockUpload = createSelectorHook(
	"MockUploadSelector",
	isMockUpload
);

export default useMockUpload;
