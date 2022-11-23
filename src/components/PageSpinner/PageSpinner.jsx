import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageSpinner = () => {
	return (
		<Wrapper>
			<CircularProgress size={100}/>
		</Wrapper>
	);
};

export default PageSpinner;
