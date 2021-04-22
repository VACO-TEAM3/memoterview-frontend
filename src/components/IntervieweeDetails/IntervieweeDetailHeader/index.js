import React from "react";
import styled from "styled-components";

import IntervieweeDetailUserInfo from "../IntervieweeDetailUserInfo";

const Header = styled.div`
  display: flex;
  width: 85%;
  height: 10vh;
  background-color: yellow;
`;

const FinalScore = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80%;
  font-size: 1rem;
  background-color: skyblue;
`;

function IntervieweeDetailHeader({ userInfo }) {
  return (
    <Header>
      <IntervieweeDetailUserInfo userInfo={userInfo}/>
      <FinalScore>
          최종 평가 ★★★★★
      </FinalScore>
    </Header>
  );
}

export default IntervieweeDetailHeader;
