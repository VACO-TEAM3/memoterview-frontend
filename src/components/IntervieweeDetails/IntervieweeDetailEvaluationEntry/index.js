import React from "react";
import styled from "styled-components";

import IntervieweeDetailComments from "../IntervieweeDetailComments";

const EvaluationDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  background-color: hotpink;
`;

const EvaluationDetailHeader = styled.div`
  display: flex;
  align-items: center;
  height: 5vh;
  background-color: blueviolet;
`;

function IntervieweeDetailEvaluationEntry({ comments }) {

  return (
    <EvaluationDetailWrapper>
      <EvaluationDetailHeader>평가 디테일</EvaluationDetailHeader>
      <div>
        <IntervieweeDetailComments comments={comments}/>
      </div>
    </EvaluationDetailWrapper>

  );
}

export default IntervieweeDetailEvaluationEntry;
