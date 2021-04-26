import React from "react";
import styled from "styled-components";

const InterviewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: pink;
`;

const InterviwerBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2vw;
  background-color: skyblue;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  background-color: green;
  font-size: 30px;
  border: 1px solid white;
`;

const InterviewerArea = styled.div`
  display: flex;
  background-color: greenyellow;
`;

const InterviwerName = styled.div`
  display: flex;
  align-items: center;
  background-color: orange;
`;

const InterviwerImg = styled.img`
  display: flex;
  margin: 0.5vh 0.5vw 0.5vh 0vw;
  border-radius: 50%;
  width: ${props => props.size};
  height: ${props => props.size};
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.5vw;
  font-size: 20px;
  background-color: red;
`;

export default function Interviewer({ searchResult }) {
  return (
    <InterviewerWrapper>
      <TitleWrapper>Q. {searchResult.title}</TitleWrapper>
      <InterviwerBox>
        <InterviewerArea>
          <Label>질문자: </Label>
          <InterviwerImg size="50px" src={searchResult.interviewerAvatar} />
          <InterviwerName>{searchResult.interviewerName}</InterviwerName>
        </InterviewerArea>
      </InterviwerBox>
    </InterviewerWrapper>
  );
}
