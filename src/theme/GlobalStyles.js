import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    margin: 0;
  }

  .hidden {
    overflow: hidden;
  }
`;

export default GlobalStyle;
