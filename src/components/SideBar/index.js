import styled from "styled-components";

const StyledSideBar = styled.nav`
  width: 2.2%;
  height: 100%;
  left: 0;
  position: fixed;
  z-index: 2;
  background: rgba(239, 241, 241, 0.5);

  .sidebar-icons {
    display: flex;
    flex-direction: column;
  }
`;

export default function SideBar({ children }) {
  return (
    <StyledSideBar>
      <div className="sidebar-icons">
        {children}
      </div>
    </StyledSideBar>
  );
}
