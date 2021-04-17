import styled from "styled-components";

export const Layout = styled.div`
  min-height: 100vh;
  
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
  color: ${({ theme }) => theme.COLOR}
`;
