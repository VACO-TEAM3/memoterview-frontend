import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: -5px;
  color: white;
  font-weight: bold;
  text-align: center;
  z-index: 1;

  h1 {
    display: inline-block;
    color: white;
    font-family: "Righteous", serif;
    font-size: 30px;
    text-shadow: 0.03em 0.03em 0 hsla(230, 40%, 50%, 1);

    &:after {
      content: attr(data-shadow);
      position: absolute;
      top: 0.06em;
      left: 0.06em;
      z-index: -1;
      text-shadow: none;
      background-image: linear-gradient(
        45deg,
        transparent 45%,
        hsla(48, 20%, 90%, 1) 45%,
        hsla(48, 20%, 90%, 1) 55%,
        transparent 0
      );
      background-size: 0.05em 0.05em;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .content {
    font-size: 22px;
    color: #8d9395;
    font-weight: normal;
  }
`;

export default function Profile({ userData, projectData }) {
  return (
    <Wrapper>
      <h1>Front End Junior</h1>
    </Wrapper>
  );
}
