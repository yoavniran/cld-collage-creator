import { useRef } from "react";
import styled from "styled-components";
import UploadDropZone from "@rpldy/upload-drop-zone";
import Typography from "@mui/material/Typography";
import AdjustIcon from "@mui/icons-material/Adjust";

//tODO: use theme colors for accent + dark/light overlay bg color !!!

const DragOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
	opacity: 0;
  background-color: rgba(236, 243, 248, 0.6);
  z-index: 5000;
  justify-content: center;
  align-items: center;
	flex-direction: column;
	gap: 30px;
	
  box-shadow: inset 0 0 10px 14px #1d7e1d,
  inset 0 0 8px 38px #52c252,
  inset 0 0 20px 38px #6fd06f,
  inset 4px 3px 50px 30px #a1e8a1;

  transition: opacity 1s ;
`;

const StyledUploadDropZone = styled(UploadDropZone)`
  position: relative;
  height: 100%;
  width: 100%;

  &.file-over {
    ${DragOverlay} {
      display: flex;
	    opacity: 1;
    }
  }
`;

const CollageUploadDropZone = ({ children }) => {
	const overlayRef = useRef(null);

	return (
		<StyledUploadDropZone
			onDragOverClassName="file-over"
			shouldHandleDrag={(e) =>  {
				//only show drop zone for files being dragged onto the page
				return e.dataTransfer?.items?.length &&
					Array.prototype.slice.call(e.dataTransfer.items)
					.every((item) => item.kind === "file" && item.type.startsWith("image/"));
			}}
			shouldRemoveDragOver={({ target }) => target === overlayRef.current}
		>
			{children}
			<DragOverlay ref={overlayRef}>
				<AdjustIcon
					color="success"
					sx={{ fontSize: "80px" }}
				/>
				<Typography variant="h3" color="primary.main">
					Drop image(s) to begin upload.
				</Typography>
			</DragOverlay>
		</StyledUploadDropZone>
	);
};

export default CollageUploadDropZone;
