import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap');
    margin: 0;
    padding: 0;
    font-family: 'Gothic A1', 'Ubuntu', sans-serif;
  }

  .hidden {
    overflow: hidden;
  }
`;

export default GlobalStyle;
