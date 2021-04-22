import React from "react";
import styled from "styled-components";

import IntervieweeDetailUserInfo from "../IntervieweeDetailUserInfo";

const ScriptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 60%;
  background-color: white;
`;

const ScriptHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  background-color: blueviolet;
`;


function IntervieweeDetailScript({ questions }) {
  return (
    <ScriptWrapper>
      <ScriptHeader>스크립트</ScriptHeader>
      <div>
        {
          questions.length ?
            questions.map(question =>
              <>
                <ul>
                  <li>문제: {question.title}</li>
                  <li>답변: {question.answer}</li>
                </ul>
              </>
            )
            : "faBatteryEmpty..."
        }
      </div>
    </ScriptWrapper>
  );
}

export default IntervieweeDetailScript;
