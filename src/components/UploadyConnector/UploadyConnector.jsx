import { useEffect } from "react";
import {
	useRequestPreSend,
	useUploady,
} from "@rpldy/uploady";
import { usePasteUpload } from "@rpldy/upload-paste";
import { useUploadDetails } from "../../state/selectors";
import useUploadyItemMonitor from "../hooks/useUploadyItemMonitor";

const UploadyConnector = () => {
	const { cloud, preset } = useUploadDetails() || {};
	const { setOptions } = useUploady();
	const { getIsEnabled } = usePasteUpload();

	console.log("Paste to Upload status = ", getIsEnabled());

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

export default UploadyConnector;
