import { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import SwipeUpAltIcon from "@mui/icons-material/SwipeUpAlt";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import { addUrlTransformation } from "../../utils";
import { useGridPhoto } from "../../state/selectors";
import useAsPhotoDragSource from "../hooks/useAsPhotoDragSource";
import TooltipIconButton from "../TooltipIconButton";
import Tooltip from "../Tooltip";
import BaseCard from "./BaseCard";
import PhotoMedia from "./PhotoMedia";

const StyledBaseCard = styled(BaseCard)`
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

const PhotoCardBase = ({
	                       className,
	                       url,
	                       name,
	                       cldId,
	                       allowDelete = false,
	                       onDelete,
                       }) => {
	const [isPhotoError, setPhotoError] = useState(false);
	const photo = { url, name, cldId };
	const setGridPhoto = useGridPhoto()[1];
	const { dragRef, isDragging } = useAsPhotoDragSource({ photo });
	const photoUrl = addUrlTransformation(url, "$&/h_160,dpr_2,g_auto,c_fill/");

	const onAddPhotoToCollage = () => {
		setGridPhoto(null, { photo });
	};

	const onImageLoadError = () => {
		setPhotoError(true);
	};

	return (
		<StyledBaseCard
			className={className}
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
				allowDelete && {
					key: "delete",
					component: <TooltipIconButton
						onClick={onDelete}
						tooltipText="Delete photo"
						tooltipDelay={1000}
						icon={<DeleteIcon/>}
						size="small"
						color="secondary"
					/>,
				},
			]}
			ref={dragRef}
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
						url={photoUrl}
						alt={name}
						isDragging={isDragging}
						onError={onImageLoadError}
						onDoubleClick={onAddPhotoToCollage}
					/>}
			</Tooltip>
		</StyledBaseCard>
	);
};

export default PhotoCardBase;
