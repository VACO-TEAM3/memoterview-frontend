import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const InterviewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5vh 0.5vw;
  background-color: ${({ theme }) => theme.SpanishBlue};
  &:hover {
    background-color: ${({ theme }) => theme.LittleBoyBlue};
  }
  /* margin-top: 0.5vh; */
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #e3f1fe;
`;

const InterviwerBox = styled.div`
  display: flex;
  /* align-items: center; */
  /* background-color: skyblue; */
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: pink;
  /* font-size: 30px; */
  font-size: ${props => props.iconSize};
  /* border: 1px solid white; */
`;

const InterviewerArea = styled.div`
  display: flex;
  width: 40%;
  background-color: greenyellow;
`;

const InterviwerName = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  /* background-color: orange; */
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
  justify-content: space-between;
  width: 95%;
  align-items: center;
  margin-right: 2vw;
  font-size: 20px;
`;

const InterviewerText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.5vw;
  font-size: 20px;
`;

export default function Interviewer({ searchResult }) {
  const ellipsizedQuestionTitle = searchResult.title.length > 40
    ? searchResult.title.substring(0, 40) + "..."
    : searchResult.title;
  const { projectId } = useParams();


  return (
    <InterviewerWrapper>
      <Link style={{ textDecoration: "none", color: "black" }} to={`/result/${projectId}/${searchResult.intervieweeId}`}>
        <Label>Q. {ellipsizedQuestionTitle}</Label>
        <InterviwerBox>
          <InterviewerText>질문자: </InterviewerText>
          <InterviwerImg size="40px" src={searchResult.interviewerAvatar} />
          <InterviwerName>{searchResult.interviewerName}</InterviwerName>
        </InterviwerBox>
      </Link>
    </InterviewerWrapper>
  );
}


