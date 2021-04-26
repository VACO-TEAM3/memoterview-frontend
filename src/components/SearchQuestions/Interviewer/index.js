import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { ELLIPSIZE_LENGTH } from "../../../constants/ellipsizeLength";
import { ellipsizeText } from "../../../utils/ellipsizeText";

const InterviewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5vh 0.5vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  background-color: ${({ theme }) => theme.Aero};
  &:hover {
    background-color: ${({ theme }) => theme.LittleBoyBlue};
  }
  text-decoration: none;
`;

const InterviwerBox = styled.div`
  display: flex;
`;

const InterviwerName = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
`;

const InterviwerImg = styled.img`
  display: flex;
  width: ${props => props.size};
  height: ${props => props.size};
  margin: 0.5vh 0.5vw 0.5vh 0vw;
  border-radius: 50%;
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: 0 0.5vw;
  font-size: 25px;
`;

const InterviewerText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.5vw;
  font-size: 20px;
`;

export default function Interviewer({ searchResult }) {
  const { projectId } = useParams();
  const ellipsizedQuestionTitle = ellipsizeText(searchResult.title, ELLIPSIZE_LENGTH.QUESTION_TITLE);

  return (
    <InterviewerWrapper>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/result/${projectId}/${searchResult.intervieweeId}`}
      >
        <Label>질문: {ellipsizedQuestionTitle}</Label>
        <InterviwerBox>
          <InterviewerText>질문자: </InterviewerText>
          <InterviwerImg size="30px" src={searchResult.interviewerAvatar} />
          <InterviwerName>{searchResult.interviewerName}</InterviwerName>
        </InterviwerBox>
      </Link>
    </InterviewerWrapper>
  );
}


