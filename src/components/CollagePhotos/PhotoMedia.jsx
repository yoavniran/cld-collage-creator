import { forwardRef } from "react";
import CardMedia from "@mui/material/CardMedia";

const PhotoMedia = forwardRef(({ url, onError, isDragging, ...props }, ref) => {
	return (
		<CardMedia
			style={{ cursor: isDragging ? "grabbing" : "default" }}
			ref={ref}
			component="img"
			height="150"
			src={url}
			onError={onError}
			{...props}
		/>
	);
});

export default PhotoMedia;
