import React from "react";
import styled from "styled-components";

const Script = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
`;

const Question = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
  height: 150px;
`;

const Answer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
`;

const Title = styled.p`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 1vw;
  font-size: 18px;
`;

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 95%;
  height: 100px;
  overflow-y: scroll;
`;

export default function ScriptBox({ recogText }) {
  return (
    <Script>
      <Question>
        <Title>질문</Title>
        <Body>{recogText}</Body>
      </Question>
      <Answer>
        <Title>대답</Title>
        <Body>{recogText}</Body>
      </Answer>
    </Script>
  );
}
