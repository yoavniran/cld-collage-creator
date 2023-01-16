import styled from "styled-components";
import HelpIcon from "@mui/icons-material/Help";

const TextWrapper = styled.span`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const FieldHelperText = ({ text }) => {
	return (<TextWrapper>
		<HelpIcon fontSize="16"/>{text}
	</TextWrapper>);
};

export default FieldHelperText;
