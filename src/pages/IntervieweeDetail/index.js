import React, { useState } from "react";
import styled from "styled-components";

import IntervieweeDetailEvaluationEntry from "../../components/IntervieweeDetails/IntervieweeDetailEvaluationEntry";
import IntervieweeDetailHeader from "../../components/IntervieweeDetails/IntervieweeDetailHeader";
import IntervieweeDetailNavBar from "../../components/IntervieweeDetails/IntervieweeDetailNavBar";

const MainLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: pink;
  width: 100%;
  height: 100vh;
  background-color: blue;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85vh;
  background-color: green;
`;

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

export default function IntervieweeDetail() {
  const userInfo = {
    name: "ri",
    email: "asdfadfaf@sdfaf.com",
  };

  const comments = [
    {
      score: "★★★★☆",
      comment: "asdfadfdafwfwefadfafdsfasfadfsafasfdsfasfd",
      commentor: { name: "11111", email: "asdfadfsadfasdf@dfadf.com" },
    },
    {
      score: "★★★★☆",
      comment: "aasdfaaaaaaaasfasfadfsafasfdsfasfd",
      commentor: { name: "2222", email: "dfadfafd22asdfadf@dfadf.com" },
    },
    {
      score: "★★★★☆",
      comment: "!!!!!!lllalalalalalala",
      commentor: { name: "3333", email: "asdftttyyyyyyfasdf@dfadf.com" },
    }
  ];

  const questions = [
    {
      title: "q1",
      answer: "aqqqqqqqqqqqqqqqqqqqqq1",
    },
    {
      title: "q2",
      answer: "aqqqqqqqqqqqqqqqqqqqqq1",
    },
    {
      title: "q2",
      answer: "aqqqqqqqqqqqqqqqqqqqqq1",
    }
  ];

  return (
    <>
      <MainLayoutWrapper>
        <IntervieweeDetailNavBar />
        <IntervieweeDetailHeader userInfo={userInfo}/>
        <Main>
          <IntervieweeDetailEvaluationEntry comments={comments} />

          <ScriptWrapper>
            <ScriptHeader>
                스크립트
            </ScriptHeader>
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
        </Main>

      </MainLayoutWrapper>
    </>
  );
}
