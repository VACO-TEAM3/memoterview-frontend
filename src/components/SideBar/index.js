import styled from "styled-components";

const StyledSideBar = styled.nav`
  width: 2.2%;
  height: 100%;
  left: 0;
  position: fixed;
  z-index: 2;

  :hover {
    background: rgba(239, 241, 241, 0.5);
  }
`;

export default function SideBar({ children }) {
  return (
    <StyledSideBar>
      {children}
    </StyledSideBar>
  );
}
