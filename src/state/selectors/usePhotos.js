import { spring, createTrackerSelectorHook } from "../store";

const {
	photos,
} = spring.metadata;

const usePhotos = createTrackerSelectorHook({ key: photos.name });

export default usePhotos;
