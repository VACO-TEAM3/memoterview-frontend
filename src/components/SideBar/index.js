import styled from "styled-components";

const StyledSideBar = styled.nav`
  height: 100%;
  left: 0;
  position: fixed;
  z-index: 2;
`;

export default function SideBar({ children }) {
  return (
    <StyledSideBar>
      {children}
    </StyledSideBar>
  );
}
