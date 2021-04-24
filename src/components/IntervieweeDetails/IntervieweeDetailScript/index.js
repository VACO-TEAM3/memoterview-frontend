import React from "react";
import styled from "styled-components";

const ScriptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1vh;
  width: 81%;
  height: 60%;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);

`;

const ScriptHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5vh;
  border-radius: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const Label = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 1.5vw;
  font-size: 1.5rem;
`;

const ScriptList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1vh;
  list-style: none;
  margin-left: 1.5vw;
`;

const Script = styled.li`
  display: flex;
  margin: 0.5vh;
  font-size: 1.3rem;
  font-weight: 300;
`;

function IntervieweeDetailScript({ questions }) {
  return (
    <ScriptWrapper>
      <ScriptHeader><Label>스크립트</Label></ScriptHeader>
      {
        questions ?
          questions.map(question =>
            <>
              <ScriptList>
                <Script>문제: {question.title}</Script>
                <Script>답변: {question.answer}</Script>
              </ScriptList>
            </>
          )
          : "No script available"
      }
    </ScriptWrapper>
  );
}

export default IntervieweeDetailScript;
