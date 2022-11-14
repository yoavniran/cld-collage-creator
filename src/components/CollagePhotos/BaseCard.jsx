import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tooltip from "../Tooltip";
import ContainerActions from "../ContainerActions";

const StyledBaseCard = styled(Card)`
  width: 180px;
  height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
	position: relative;
	
	.action-circle {
		button {
			padding: 12px;
		}
	}
`;

const BaseCard = ({ children, tooltipText, actions, className, firstActionAlwaysShow }) => {
	return (
		<StyledBaseCard
			className={className}
			variant="outlined"
		>
			<Tooltip
				show={!!tooltipText}
				placement="top"
				severity="info"
				text={tooltipText}
			>
				<CardContent sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: 0,
					width: "100%",
					height: "100%",
				}}>
					{children}
				</CardContent>
			</Tooltip>
			{actions && <ContainerActions
				actions={actions}
				firstAlwaysShow={firstActionAlwaysShow}
				delay={100}
			/>}
		</StyledBaseCard>
	);
};

export default BaseCard;
