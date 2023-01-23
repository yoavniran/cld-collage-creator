import { useState } from "react";
import styled from "styled-components";
import { useBatchAddListener } from "@rpldy/uploady";
import { UploadPreview } from "@rpldy/upload-preview";
import MenuItem from "@mui/material/MenuItem";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import MinimizeIcon from "@mui/icons-material/Minimize";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	useDamConfig,
	useGetPhotoOverCell,
	usePhotos,
	usePhotosDrawerHeight,
} from "../../state/selectors";
import { useFillGridPhotos } from "../../state/setters";
import IconButtonMenu from "../IconButtonMenu";
import ResizableBottomContainer from "../ResizableBottomContainer";
import EmptyCard from "./EmptyCard";
import UploadingCard from "./UploadingCard";
import UploadPhotoCard from "./UploadPhotoCard";
import AssetPhotoCard from "./AssetPhotoCard";
import Tooltip from "../Tooltip/Tooltip";

const MIN_CONTAINER_HEIGHT = 14;

const StyledResizableBottomContainer = styled(ResizableBottomContainer)`
  ${({ $visible }) => !$visible && "visibility: hidden;"}
`;

const PhotosContainer = styled.div`
  padding: 12px 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

//TODO: make photos list virtual?
//tODO: make photos list sortable?
//TODO: support drag/paste of cloudinary res URL????

const StyledIconButtonMenu = styled(IconButtonMenu)`
  position: absolute;
  right: 2px;
  top: 10px;
`;

const CollagePhotos = () => {
	const photoOverCell = useGetPhotoOverCell();
	const photos = usePhotos();
	const [drawerHeight, setDrawerHeight] = usePhotosDrawerHeight();
	const fillCells = useFillGridPhotos();
	const damConfig = useDamConfig();
	const [noPhotos, setNoPhotos] = useState(() => !damConfig?.assets?.length && !photos.length);

	useBatchAddListener(() => setNoPhotos(false));

	const onFillCells = () => {
		fillCells(damConfig);
	};

	const onMinimize = () => {
		setDrawerHeight(MIN_CONTAINER_HEIGHT);
	};

	return (
		<StyledResizableBottomContainer
			minHeight={MIN_CONTAINER_HEIGHT}
			height={drawerHeight}
			setHeight={setDrawerHeight}
			$visible={!photoOverCell}
		>
			<PhotosContainer sx={{ height: "100%" }}>
				<Tooltip
					open={noPhotos}
					severity="info"
					placement="right"
					title="Get Started!"
					text="Upload your photos here to begin creating your collage"
				>
					<EmptyCard showTooltip={!noPhotos}/>
				</Tooltip>

				<UploadPreview
					rememberPreviousBatches
					PreviewComponent={UploadingCard}
				/>
				{damConfig?.assets?.map((asset) =>
					<AssetPhotoCard key={asset.id} asset={asset}/>)}
				{photos.map((photoId) =>
					<UploadPhotoCard key={photoId} id={photoId}/>)}
			</PhotosContainer>

			<StyledIconButtonMenu icon={<MoreVertIcon/>}>
				<MenuItem onClick={onFillCells} disabled={!photos.length}>
					<BurstModeIcon/> Fill Cells
				</MenuItem>
				<MenuItem onClick={onMinimize}>
					<MinimizeIcon/> Minimize
				</MenuItem>
			</StyledIconButtonMenu>
		</StyledResizableBottomContainer>
	);
};

export default CollagePhotos;

