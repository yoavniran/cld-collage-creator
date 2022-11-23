import styled from "styled-components";
import { UploadPreview } from "@rpldy/upload-preview";
import MenuItem from "@mui/material/MenuItem";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import ResizableBottomContainer from "../ResizableBottomContainer";
import EmptyCard from "./EmptyCard";
import UploadingCard from "./UploadingCard";
import PhotoCard from "./PhotoCard";
import { useDamConfig, usePhotos, usePhotosDrawerHeight } from "../../state/selectors";
import { useFillGridPhotos } from "../../state/setters";
import IconButtonMenu from "../IconButtonMenu";

const MIN_CONTAINER_HEIGHT = 14;

const StyledResizableBottomContainer = styled(ResizableBottomContainer)`
	
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
	const photos = usePhotos();
	const [drawerHeight, setDrawerHeight] = usePhotosDrawerHeight();
	const fillCells = useFillGridPhotos();
	const damConfig = useDamConfig();
	console.log("DAM CONFIG !!!!!!!!!!! ", damConfig);

	const onFillCells = () => {
		fillCells();
	};

	return (
		<StyledResizableBottomContainer
			minHeight={MIN_CONTAINER_HEIGHT}
			height={drawerHeight}
			setHeight={setDrawerHeight}
		>
			<PhotosContainer sx={{ height: "100%" }}>
				<EmptyCard/>
				<UploadPreview
					rememberPreviousBatches
					PreviewComponent={UploadingCard}
				/>
				{photos.map((photoId) =>
					<PhotoCard id={photoId} key={photoId}/>)}
			</PhotosContainer>
			<StyledIconButtonMenu>
				<MenuItem onClick={onFillCells} disabled={!photos.length}>
					<BurstModeIcon /> Fill Cells
				</MenuItem>
			</StyledIconButtonMenu>
		</StyledResizableBottomContainer>
	);
};

export default CollagePhotos;

