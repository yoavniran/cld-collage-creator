import styled, { css } from "styled-components";
import Box from "@mui/material/Box";

export const photoOverCellCss = css`
  .grid-cell[data-id="${({ $photoOverCell }) => $photoOverCell}"] {
	  .MuiPaper-root {
      box-shadow: inset 0 0 4px 6px #4B4C4B,
      inset 0 0 4px 12px #828482,
      inset 0 0 6px 20px #B2B5B2,
      inset 4px 3px 7px -19px rgba(243, 253, 255, 0);
    }
  }

  .grid-cell[data-id]:not([data-id="${({ $photoOverCell }) => $photoOverCell}"]) {
    .MuiPaper-root {
      filter: brightness(0.5) saturate(0.5) contrast(1.2) blur(6px);
    }
  }
`;

export const GridContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  aspect-ratio: 1 / 1;
  margin: 20px auto;
  user-select: none;
	position: relative;
	width: 100%;
	border: ${({ $width, $color }) => `${$color} ${$width}px` } solid;
	box-shadow: 2px 0 12px 2px #282c34;

  .grid-cell {
    transition: filter 0.4s linear,
            transform 0.4s linear,
  					box-shadow 0.4s linear; 
  }
	
	${({ theme }) => `
		padding: 0 40px;
		
		${theme.breakpoints.down("md")} {
			padding: 0 20px;
		}
	`}
	
	${({ $photoOverCell }) => $photoOverCell !== null ? photoOverCellCss : ""}
`;
