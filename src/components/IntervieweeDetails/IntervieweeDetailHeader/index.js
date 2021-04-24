import React from "react";
import styled from "styled-components";

import IntervieweeDetailUserInfo from "../IntervieweeDetailUserInfo";

const Header = styled.div`
  display: flex;
  width: 85%;
  height: 10vh;
`;

const FinalScore = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80%;
  font-size: 1rem;
`;

const Label = styled.div`
  display: flex;
`;

function IntervieweeDetailHeader({
  createFinalScoreStars,
  comments,
  email,
  name,
}) {
  return (
    <Header>
      <IntervieweeDetailUserInfo email={email} name={name} />
      <FinalScore>
        <Label>최종 평가</Label>
        { createFinalScoreStars(comments) }
      </FinalScore>
    </Header>
  );
}

export default IntervieweeDetailHeader;
