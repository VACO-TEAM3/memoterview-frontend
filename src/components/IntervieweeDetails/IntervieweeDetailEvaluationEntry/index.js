import React from "react";
import styled from "styled-components";

import IntervieweeDetailComments from "../IntervieweeDetailComments";

const EvaluationDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
`;

const EvaluationDetailHeader = styled.div`
  display: flex;
  align-items: center;
  height: 5vh;
`;

const CommentsWrapper = styled.div`
`;

export default function IntervieweeDetailEvaluationEntry({ createStars, comments }) {
  return (
    <EvaluationDetailWrapper>
      <EvaluationDetailHeader>평가 디테일</EvaluationDetailHeader>
      <CommentsWrapper>
        <IntervieweeDetailComments createStars={createStars} comments={comments}/>
      </CommentsWrapper>
    </EvaluationDetailWrapper>
  );
}
