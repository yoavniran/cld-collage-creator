import { FILE_STATES } from "@rpldy/uploady";

const FILE_UPLOADING_STATES = [
	FILE_STATES.ADDED,
	FILE_STATES.UPLOADING,
	FILE_STATES.PENDING,
];

const FILE_FAILED_STATES = [
	FILE_STATES.ERROR,
	FILE_STATES.ABORTED,
	FILE_STATES.CANCELLED,
];

const getIsUploadInProgress = ({ state }) => {
	return FILE_UPLOADING_STATES.includes(state);
};

const getIsUploadFinished = (item) => !getIsUploadInProgress(item);

const getIsUploadFailed = ({ state }) => {
	return FILE_FAILED_STATES.includes(state);
};

const getIsUploadSuccess = ({ state }) => state === FILE_STATES.FINISHED;

const getIsUploadCancelled = ({ state }) => state === FILE_STATES.CANCELLED;

export {
	getIsUploadInProgress,
	getIsUploadFinished,
	getIsUploadFailed,
	getIsUploadSuccess,
	getIsUploadCancelled,
};
