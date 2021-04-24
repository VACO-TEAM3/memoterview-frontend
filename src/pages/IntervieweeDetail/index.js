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
  width: 95%;
  height: 100vh;
  margin: 2vw;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85vh;
`;

export default function IntervieweeDetail({
  createStars,
  onGeneratePdfBtnClick,
  intervieweeInfo,
  onGoBackButtonClick,
  createFinalScoreStars,
}) {
  const { email, name, comments, questions } = intervieweeInfo;

  return (
    <>
      <MainLayoutWrapper>
        <IntervieweeDetailNavBar
          onGoBackButtonClick={onGoBackButtonClick}
          onGeneratePdfBtnClick={onGeneratePdfBtnClick}
        />
        <IntervieweeDetailHeader
          name={name}
          email={email}
          comments={comments}
          createFinalScoreStars={createFinalScoreStars}
        />
        <Main>
          <IntervieweeDetailEvaluationEntry createStars={createStars} comments={comments}/>
          <IntervieweeDetailScript questions={questions}/>
        </Main>
      </MainLayoutWrapper>
    </>
  );
}
