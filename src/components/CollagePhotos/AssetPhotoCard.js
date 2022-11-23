import { memo } from "react";
import styled from "styled-components";
import PhotoCardBase from "./PhotoCardBase";

const StyledPhotoCardBase = styled(PhotoCardBase)`
	box-shadow: 0 0 6px 2px ${(theme) => theme.palette.action.active};
`;

const AssetPhotoCard = memo(({ asset }) => {
	const { secure_url, filename, public_id } = asset;

	return (
		<StyledPhotoCardBase
			url={secure_url}
			name={filename}
			cldId={public_id}
		/>
	);
});

export default AssetPhotoCard;
