import styled from "styled-components";
import ListItem from "@mui/material/ListItem";
import InputLabel from "@mui/material/InputLabel";

const StyledItem = styled(ListItem)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: flex-start;
  align-items: center;
	
  .MuiInputBase-formControl, .react-colorful {
    margin-bottom: 6px;
  }

  fieldset.MuiOutlinedInput-notchedOutline {
	  border-color: ${({ theme }) => theme.palette.divider}
  }
	
	> label {
    transform: scale(0.75);
		align-self: flex-start;
	}
`;

const MenuField = ({ children, title }) => {
	return (
		<StyledItem>
			{title && <InputLabel>{title}</InputLabel>}
				{children}
		</StyledItem>
	)
};

export default MenuField;
