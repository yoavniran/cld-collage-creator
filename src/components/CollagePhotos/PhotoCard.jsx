import { memo, useState } from "react";
import styled from "styled-components";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import SwipeUpAltIcon from "@mui/icons-material/SwipeUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { addUrlTransformation } from "../../utils";
import { useGridPhoto, usePhoto } from "../../state/selectors";
import useAsPhotoDragSource from "../hooks/useAsPhotoDragSource";
import TooltipIconButton from "../TooltipIconButton";
import Tooltip from "../Tooltip";
import BaseCard from "./BaseCard";
import PhotoMedia from "./PhotoMedia";

const PhotoBaseCard = styled(BaseCard)`
	.MuiCardContent-root {
    overflow: hidden;
  }

  .MuiCardMedia-root {
	  height: 100%;
  }
	
	&:hover {
    img {
      cursor: grab;
      transition: all 0.5s ease;

      &:hover {
        filter: brightness(170%);
        transform: scale(1.1) translateZ(0);
      }
    }
  }
`;

const ErrorContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PhotoCard = memo(({ id }) => {
	const setGridPhoto = useGridPhoto()[1];
	const [photo, setPhoto] = usePhoto(id);
	const { url, name, cldId, } = photo;
	const [isPhotoError, setPhotoError] = useState(false);
	const photoUrl = addUrlTransformation(url, "$&/h_160,dpr_2,g_auto,c_fill/");
	const { dragRef, isDragging } = useAsPhotoDragSource({ photo });

	const onRemovePhoto = () => {
		setPhoto(cldId, null);
	};

	const onAddPhotoToCollage = () => {
		setGridPhoto(null, { photo });
	};

	const onImageLoadError = () => {
		setPhotoError(true);
	};

	return (
		<PhotoBaseCard
			actions={[
				!isPhotoError && {
					key: "add-to-first",
					component: <TooltipIconButton
						onClick={onAddPhotoToCollage}
						tooltipText="Add to first available collage cell"
						tooltipDelay={1000}
						icon={<SwipeUpAltIcon/>}
						size="small"
						color="secondary"
					/>,
				},
				{
					key: "delete",
					component: <TooltipIconButton
						onClick={onRemovePhoto}
						tooltipText="Delete photo"
						tooltipDelay={1000}
						icon={<DeleteIcon/>}
						size="small"
						color="secondary"
					/>,
				},
			]}
		>
			<Tooltip
				title="Drag to Collage"
				placement="top"
				text={isPhotoError ?
					"Failed to load photo..." :
					"Drag the photo onto one of the collage's cells"}
				severity={isPhotoError ? "error" : "info"}
				delay={2000}
				show={!isDragging}
			>
				{isPhotoError ?
					<ErrorContainer>
						<BrokenImageIcon fontSize="large" color="error"/>
					</ErrorContainer> :
					<PhotoMedia
						ref={dragRef}
						url={photoUrl}
						alt={name}
						isDragging={isDragging}
						onError={onImageLoadError}
						onDoubleClick={onAddPhotoToCollage}
					/>}
			</Tooltip>
		</PhotoBaseCard>
	);
});

export default PhotoCard;
