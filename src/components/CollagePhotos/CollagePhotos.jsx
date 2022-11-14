import styled from "styled-components";
import { UploadPreview } from "@rpldy/upload-preview";
import ResizableBottomContainer from "../ResizableBottomContainer";
import EmptyCard from "./EmptyCard";
import UploadingCard from "./UploadingCard";
import PhotoCard from "./PhotoCard";
import { usePhotos, usePhotosDrawerHeight } from "../../state/selectors";

const MIN_CONTAINER_HEIGHT = 14;

const PhotosContainer = styled.div`
  padding: 12px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

//TODO: make photos list virtual?
//tODO: make photos list sortable?
//TODO: add fill grid button to fill all empty cells by order
//TODO: support drag/paste of cloudinary res URL????

const CollagePhotos = () => {
	const photos = usePhotos();
	const [drawerHeight, setDrawerHeight] = usePhotosDrawerHeight();

	return (
		<ResizableBottomContainer
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
		</ResizableBottomContainer>
	);
};

export default CollagePhotos;

