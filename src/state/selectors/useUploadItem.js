import isString from "lodash/isString";
import { createSelectorFamilyHook } from "recoil-spring";
import atoms from "../store";
import { getIsUploadSuccess } from "../../utils";

const {
	uploads,
} = atoms;

const useUploadItem = createSelectorFamilyHook(
	uploads,
	(param, uploadyItem, { set, reset }) => {
		if (uploadyItem === null || getIsUploadSuccess(uploadyItem)) {
			reset(uploads(param));
		} else {
			const itemResponse = uploadyItem.uploadResponse || "";
			const response = isString(itemResponse) ? itemResponse :
				itemResponse.data?.error?.message;

			set(uploads(param), {
				progress: uploadyItem.completed,
				state: uploadyItem.state,
				name: uploadyItem.file.name,
				response,
			});
		}
	});

export default useUploadItem;
