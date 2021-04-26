import React from "react";
import styled from "styled-components";

import Interviewer from "../Interviewer";

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: green;
  border: 1px solid white;
`;


export default function Question({ question }) {
  return (
    <QuestionWrapper>
      <div>점수: {question.score}</div>
      <div>답변자: {question.answerer}</div>
      <div>답변날짜: {question.interviewDate}</div>
      <div>답변: {question.answer}</div>
    </QuestionWrapper>
  );
}
