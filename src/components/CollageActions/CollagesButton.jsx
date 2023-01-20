import { useState } from "react";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import TooltipIconButton from "../TooltipIconButton";
import CollagesModal from "./CollagesModal";

const CollagesButton = () => {
	const [isCollagesShowing, setCollagesShowing] = useState(false);

	const onShowCollages = () => {
		setCollagesShowing(true);
	};

	const onCollagesModelClose = () => {
		setCollagesShowing(false);
	};

	return (
		<>
		<TooltipIconButton
			aria-label="see created collages"
			onClick={onShowCollages}
			icon={<BookmarksIcon fontSize="large"/>}
			tooltipTitle="View created collages"
			tooltipSimple
		/>
			{isCollagesShowing &&
				<CollagesModal onClose={onCollagesModelClose} />}
		</>
	);
};

export default CollagesButton;
