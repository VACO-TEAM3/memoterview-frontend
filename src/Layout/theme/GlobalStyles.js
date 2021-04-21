import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  .hidden {
    overflow: hidden;
  }
`;

export default GlobalStyle;
