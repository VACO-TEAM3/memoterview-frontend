import styled from "styled-components";

export default styled.div`
  position: relative;
  padding: ${props => props.padding};
  width: ${props => props.width};
  height: ${props => props.height};
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;
  overflow-y: scroll;
`;
