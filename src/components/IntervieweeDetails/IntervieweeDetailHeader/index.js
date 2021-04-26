import React from "react";
import styled from "styled-components";

import { createStars } from "../../../utils/createStars";
import IntervieweeDetailUserInfo from "../IntervieweeDetailUserInfo";

const Header = styled.div`
  display: flex;
  width: 85%;
  height: 10vh;
  padding-bottom: 2vh;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const FinalScore = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 70%;
  font-size: 1rem;
`;

const FinalContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  font-size: 2rem;
  margin-right: 0.5vw;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

function IntervieweeDetailHeader({
  email,
  name,
  commentAvgScore,
}) {
  return (
    <Header>
      <IntervieweeDetailUserInfo email={email} name={name} />
      <FinalScore>
        <FinalContainer>
          <Label>최종 평가</Label>
          <Stars>{createStars(commentAvgScore)}</Stars>
        </FinalContainer>
      </FinalScore>
    </Header>
  );
}

export default IntervieweeDetailHeader;
