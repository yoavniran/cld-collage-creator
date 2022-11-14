import styled from "styled-components";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const FieldWrapper = styled.div`
	margin-top: 10px;
	padding: 0 6px;
`;

const StyledItem = styled(ListItem)`
  .MuiListItemText-root {
	  margin: 8px 0;
  }
`;

const MenuField = ({ title, children, withDivider = true }) => {
	return (
		<FieldWrapper>
			{withDivider && <Divider />}
			<StyledItem>
				<ListItemText primary={title} sx={{ textAlign: "center" }}/>
			</StyledItem>
			{children}
		</FieldWrapper>
	);
};

export default MenuField;
