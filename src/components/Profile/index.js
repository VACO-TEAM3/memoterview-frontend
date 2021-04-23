import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 15%;
  font-size: 30px;
  color: #3193C4;
  font-weight: bold;
  text-align: center;
  z-index: 2;

  .content {
    font-size: 22px;
    color: #8D9395;
    font-weight: normal;
  }
`;

export default function Profile({ userData, projectData }) {
  return (
    <Wrapper>
      <div>Front End Junior</div>
      <div className="content">2021.04.25</div>
    </Wrapper>
  );
}
