import styled from "styled-components";

export const ImageContainer = styled.div`
  display: flex;
	justify-content: center;
	align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-grow: 2;
  width: 100%;
`;

const BaseCell = styled.div`
  box-shadow: 0 0 10px 0 ${({ theme }) => theme.palette.primary.light};
	min-width: 80px;
	max-width: 200px;
	width: 30%;
	aspect-ratio: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
  position: relative;
	
	.MuiTypography-caption {
    font-size: 1.1rem;
    margin: 2px 0;
  }
	
	&:hover {
    box-shadow: 0 0 4px 0 ${({ theme }) => theme.palette.primary.light};
	}
`;

export default BaseCell;
