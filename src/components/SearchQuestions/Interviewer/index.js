import React from "react";
import styled from "styled-components";

const QuestionerWrapper = styled.div`
  display: flex;
  background-color: pink;
`;


const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: green;
  border: 1px solid white;
`;

export default function Interviewer({ question }) {
  return (
    <QuestionerWrapper>
      <TitleWrapper>질문: {question.title}</TitleWrapper>
      <div>질문자: <img src={question.interviewerAvatar}></img>{question.interviewerName}</div>
    </QuestionerWrapper>
  );
}
