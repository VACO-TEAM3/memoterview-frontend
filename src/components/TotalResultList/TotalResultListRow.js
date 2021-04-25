import styled from "styled-components";

export default styled.div`
  display: flex;
  padding-right: 50px;
  height: 70px;
  width: 100%;
  border: 1px solid gray;
  border-radius: 2px;
  box-sizing: border-box;

  &:not(:first-child) {
    border-top: none;
  }
`;
