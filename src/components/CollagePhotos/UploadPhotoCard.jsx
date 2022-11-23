import { memo } from "react";
import { usePhoto } from "../../state/selectors";
import PhotoCardBase from "./PhotoCardBase";

const UploadPhotoCard = memo(({ id }) => {
	const [photo, setPhoto] = usePhoto(id);
	const { url, name, cldId } = photo;

	const onRemovePhoto = () => {
		setPhoto(cldId, null);
	};

	return (
		<PhotoCardBase
			allowDelete
			url={url}
			name={name}
			cldId={cldId}
			onDelete={onRemovePhoto}
		/>
	);
});

export default UploadPhotoCard;
