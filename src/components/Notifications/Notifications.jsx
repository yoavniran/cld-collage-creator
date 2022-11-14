import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNotifications } from "../../state/selectors";
import { useRemoveNotificationOfType } from "../../state/setters";

const NOTIFICATION_ANCHOR = { vertical: "top", horizontal: "center" };

const SnackbarAlert = forwardRef((props, ref) =>
	<Alert elevation={6} ref={ref} variant="filled" {...props} />);

const Notifications = () => {
	const [notifications, setNotifications] = useNotifications();
	const removeNotificationOfType = useRemoveNotificationOfType();
	const currentNotification = notifications[0];
	const showNotification = !!currentNotification;

	const onClose = (e, reason) => {
		if (reason === "timeout") {
			setNotifications([]);
		} else if (reason !== "clickaway") {
			removeNotificationOfType(currentNotification.type);
		}
	};

	return (
		<Snackbar
			key={currentNotification?.type}
			open={showNotification}
			autoHideDuration={4000}
			anchorOrigin={NOTIFICATION_ANCHOR}
			onClose={onClose}
		>
			<SnackbarAlert
				onClose={onClose}
				severity={currentNotification?.severity}
				sx={{ width: "100%" }}
			>
				{currentNotification?.message}
			</SnackbarAlert>
		</Snackbar>
	);
};

export default Notifications;
