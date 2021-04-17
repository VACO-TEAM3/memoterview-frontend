import styled from "styled-components";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 3.5rem;
  background: white;
  border-bottom: 1px solid #EEEEEE;
  z-index: 1;
`;

export default function Header({ children }) {
  return (
    <HeaderWrapper>
      {children}
    </HeaderWrapper>
  );
}