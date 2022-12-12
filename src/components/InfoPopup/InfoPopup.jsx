import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const InfoPopup = ({ className }) => {
	const [open, setOpen] = useState(false);

	const handleClose = (...args) => {
		console.log("!!!!!! info tooltip closing ", ...args);
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<Tooltip
			open={open}
			onClose={handleClose}
			onOpen={handleOpen}
			title="Add"
		>
			<LightbulbIcon fontSize="large" className={className}/>
		</Tooltip>
	);
};

export default InfoPopup;
