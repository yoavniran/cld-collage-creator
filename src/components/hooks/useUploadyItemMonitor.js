import {
	useItemStartListener,
	useItemFinalizeListener,
	useItemProgressListener,
	useBatchAddListener,
} from "@rpldy/uploady";
import { getIsUploadSuccess } from "../../utils";
import { usePhoto, useUploadItem } from "../../state/selectors";

const useUploadyItemMonitor = () => {
	const setPhoto = usePhoto()[1]
	const setUploadItem = useUploadItem()[1];
	const uploadUpdater = (item) => setUploadItem(item.id, item);

	useItemStartListener(({ file }) => {
		return file.type.startsWith("image/");
	});

	useBatchAddListener(({ items }) => {
		items.forEach(uploadUpdater);
	});

	useItemProgressListener(uploadUpdater);

	useItemFinalizeListener((item) => {
		uploadUpdater(item);

		if (getIsUploadSuccess(item)) {
			setPhoto(item.id, item);
		}
	});
};

export default useUploadyItemMonitor;
