import React from "react";
import styled from "styled-components";

const IntervieweeWrapper = styled.div`
  display: flex;
  background-color: pink;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: green;
  border: 1px solid white;
`;

export default function Interviewer({ searchResult }) {
  return (
    <IntervieweeWrapper>
      <div>점수: {searchResult.score}</div>
      <div>답변자: {searchResult.intervieweeName}</div>
      <div>답변날짜: {searchResult.interviewDate}</div>
      <div>답변: {searchResult.answer}</div>
    </IntervieweeWrapper>
  );
}
