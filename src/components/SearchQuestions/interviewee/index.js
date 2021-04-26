import React from "react";
import styled from "styled-components";

const IntervieweeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vh 2vw;
  background-color: orange;
`;

const ScoreWrapper = styled.div`
  display: flex;
  background-color: red;
`;

const InterviweeNameWrapper = styled.div`
  display: flex;

  background-color: yellow;
`;

const InterviewDateWrapper = styled.div`
  display: flex;
  background-color: green;
`;

const Label = styled.div`
  display: flex;
  margin-right: 0.5vw;
  background-color: blue;
`;


const DataWrapper = styled.div`
  display: flex;
  height: 100%;
  background-color: green;
  min-width: 0;
`;


const ResultWrapper = styled.div`
  display: flex;
  width: 90%;
  padding: 0.5vh 0 0.5vw 0;
  font-size: 18px;
  border: 1px solid white;
  background-color: pink;
`;

const Span = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-color: red;
`;

// const ResultBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 80%;
//   background-color: hotpink;
// `;

export default function Interviewee({ searchResult }) {
  const ellipsizedAnswewr = searchResult.answer.length > 120
    ? searchResult.answer.substring(0, 120) + "..."
    : searchResult.answer;

  return (
    <IntervieweeWrapper>
      <ResultWrapper><Label>답변자:</Label><DataWrapper>{searchResult.intervieweeName}</DataWrapper></ResultWrapper>
      <ResultWrapper><Label>답변날짜:</Label><DataWrapper>{searchResult.interviewDate}</DataWrapper></ResultWrapper>
      <ResultWrapper><Label>답변:</Label><DataWrapper>{ellipsizedAnswewr}</DataWrapper></ResultWrapper>
      <ResultWrapper><Label>점수:</Label> <DataWrapper>{searchResult.score}</DataWrapper></ResultWrapper>
    </IntervieweeWrapper>
  );
}
