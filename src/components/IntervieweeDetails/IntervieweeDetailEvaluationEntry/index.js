import React from "react";
import styled from "styled-components";

import IntervieweeDetailComments from "../IntervieweeDetailComments";

const EvaluationDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
`;

const Label = styled.p`
  display: flex;
  width: 20%;
  margin: 1vh 3vh;
  font-size: 1.5rem;
`;

const EvaluationDetailHeader = styled.div`
  display: flex-start;
  justify-content: center;
  align-items: center;
  width: 85%;
  margin: 3vh 2vh 0 2vh;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  font-size: 1.3rem;
`;

const CommentsWrapper = styled.div`
  display: flex;
  width: 85%;
`;

export default function IntervieweeDetailEvaluationEntry({ createStars, comments }) {
  return (
    <EvaluationDetailWrapper>
      <EvaluationDetailHeader>
        <Label>평가 디테일</Label>
      </EvaluationDetailHeader>
      <CommentsWrapper>
        <IntervieweeDetailComments createStars={createStars} comments={comments}/>
      </CommentsWrapper>
    </EvaluationDetailWrapper>
  );
}
