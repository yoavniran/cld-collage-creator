import styled from "styled-components";

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
	
	&:hover {
    box-shadow: 0 0 4px 0 ${({ theme }) => theme.palette.primary.light};
	}
`;

export default BaseCell;
