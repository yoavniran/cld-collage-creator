import { useEffect } from "react";
import Uploady, {
	useRequestPreSend,
	useUploady,
} from "@rpldy/uploady";
import { usePasteUpload } from "@rpldy/upload-paste";
import { logger } from "../../utils";
import { useDebug, useUploadDetails } from "../../state/selectors";
import useUploadyItemMonitor from "../hooks/useUploadyItemMonitor";
import useUploadyEnhancers from "./useUploadyEnhancers";

const UploadyConfig = () => {
	const { cloud, preset } = useUploadDetails() || {};
	const { setOptions } = useUploady();
	const { getIsEnabled } = usePasteUpload();

	logger.log("Paste to Upload status = ", getIsEnabled());

	useEffect(() => {
		setOptions({
			fileFilter: (file) => file.type.startsWith("image/"),
		});
	}, []);

	useRequestPreSend(() => {
		return {
			options: {
				destination: {
					url: `https://api.cloudinary.com/v1_1/${cloud}/upload`,
					params: {
						upload_preset: preset,
					},
				},
			},
		};
	});

	useUploadyItemMonitor();

	return null;
};

const UploadyConnector = ({ children }) => {
	const uploadyEnhancers = useUploadyEnhancers();
	const [isDebug] = useDebug()

	return (
		<Uploady
			debug={isDebug}
			concurrent
			maxConcurrent={5}
			accept="image/*"
			enhancer={uploadyEnhancers}
		>
			<UploadyConfig/>
			{children}
		</Uploady>
	);
};

export default UploadyConnector;
