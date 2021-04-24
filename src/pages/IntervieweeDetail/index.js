import React from "react";
import styled from "styled-components";

import IntervieweeDetailEvaluationEntry from "../../components/IntervieweeDetails/IntervieweeDetailEvaluationEntry";
import IntervieweeDetailHeader from "../../components/IntervieweeDetails/IntervieweeDetailHeader";
import IntervieweeDetailNavBar from "../../components/IntervieweeDetails/IntervieweeDetailNavBar";
import IntervieweeDetailScript from "../../components/IntervieweeDetails/IntervieweeDetailScript";

const MainLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85vh;
`;

export default function IntervieweeDetail({ onGoBackButtonClick, intervieweeInfo }) {
  const { email, name, comments, questions } = intervieweeInfo;

  return (
    <MainLayoutWrapper>
      <IntervieweeDetailNavBar onGoBackButtonClick={onGoBackButtonClick} />
      <IntervieweeDetailHeader email={email} name={name}/>
      <Main>
        <IntervieweeDetailEvaluationEntry comments={comments}/>
        <IntervieweeDetailScript questions={questions}/>
      </Main>
    </MainLayoutWrapper>
  );
}
