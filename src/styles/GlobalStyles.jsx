import { css, createGlobalStyle } from "styled-components";
import { alpha } from "@mui/material";
import { isMobile } from "react-device-detect";
import "@fontsource/roboto-serif/300.css";
import "@fontsource/roboto-serif/400.css";
import "@fontsource/roboto-serif/500.css";
import "@fontsource/roboto-serif/700.css";
import "@fontsource/chicle/400.css";

const opaquePaperCss = css`
  background-color: ${({ theme }) => alpha(theme.palette.background.paper, 0.9)};
`;

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Roboto Serif", serif;
  }

  #root {
    height: 100vh;
    width: 100%;
  }

  .selection-area {
    background: ${({ theme }) => alpha(theme.palette.primary.dark, 0.4)}
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border: 2px dashed ${({ theme }) => theme.palette.primary.light};
    border-radius: 0.1em;
  }

  .MuiPaper-root.hover-opaque {
    &:hover {
      ${opaquePaperCss}
    }
	  
	  ${isMobile ? opaquePaperCss : ""}
  }
  
  a {
	  color: ${({ theme }) => theme.palette.primary.light };
  }
`;

export default GlobalStyles;
