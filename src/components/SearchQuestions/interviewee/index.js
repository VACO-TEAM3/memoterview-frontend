import React from "react";
import styled from "styled-components";

const IntervieweeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5vh 0.5vw;
  /* background-color: orange; */
`;

const Label = styled.div`
  display: flex;
  margin-right: 0.5vw;
  /* background-color: blue; */
`;

const DataWrapper = styled.div`
  display: flex;
  /* background-color: green; */
  min-width: 0;
`;

const ResultWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  padding: 0.5vh;
  font-size: 18px;
  /* background-color: pink; */
`;

export default function Interviewee({ searchResult }) {
  const ellipsizedAnswewr = searchResult.answer.length > 70
    ? searchResult.answer.substring(0, 70) + "..."
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
