import styled from "styled-components";

export default styled.div`
  display: flex;
  padding-right: 50px;
  height: 70px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.BabyPowder};
  border-radius: 2px;
  box-sizing: border-box;

  &:last-child {
    border-bottom: none;
  }
`;
