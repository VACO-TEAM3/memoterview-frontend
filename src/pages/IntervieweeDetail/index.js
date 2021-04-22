import React, { useState } from "react";
import styled from "styled-components";

import UserIcon from "../../components/UserIcon";
import UserInfo from "../../components/UserInfo";

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

const Header = styled.div`
  display: flex;
  width: 85%;
  height: 10vh;
  background-color: yellow;
`;

const UserIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2vw;
  background-color: white;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1vw;
  background-color: coral;
`;

const Navbar = styled.div`
  display: flex;
  width: 100%;
  height: 5vh;
  background-color: pink;
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

const UserName = styled.div`
  font-size: 1.2rem;
  margin: 0.5vh;
`;

const UserEmail = styled.div`
  font-size: 1rem;
  margin: 0.5vh;
`;

const FinalScore = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80%;
  font-size: 1rem;
  background-color: skyblue;
`;

const EvaluationDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  background-color: hotpink;
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

const Comment = styled.div`
  display: flex;
  width: 80vw;
  background-color: whitesmoke;
`;

const EvaluationDetailHeader = styled.div`
  display: flex;
  align-items: center;
  height: 5vh;
  background-color: blueviolet;
`;

const InterviewerInfoWrapper = styled.div`
  display: flex;
  
  width: 40%;
  background-color: blue;
`;

export default function IntervieweeDetail() {
  const userInfo = {
    userName: "ri",
    userEmail: "asdfadfaf@sdfaf.com",
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
        <Navbar />
        <Header>
          <UserIconWrapper>
            <UserIcon />
          </UserIconWrapper>
          <UserInfoWrapper>
            <UserName>유저이름..</UserName>
            <UserEmail>유저 이메일..</UserEmail>
          </UserInfoWrapper>
          <FinalScore>
            최종 평가 ★★★★★
          </FinalScore>
        </Header>

        <Main>
          <EvaluationDetailWrapper>
            <EvaluationDetailHeader>평가 디테일</EvaluationDetailHeader>
            <div>
              <Comment>
                <div>
                  {
                    comments.length ?
                      comments.map(comment =>
                        <>
                          <InterviewerInfoWrapper>
                            <UserIconWrapper>
                              <UserIcon/>
                            </UserIconWrapper>
                            <UserInfoWrapper>
                              <div>{comment.commentor.name}</div>
                              <div>{comment.commentor.email}</div>
                            </UserInfoWrapper>
                          </InterviewerInfoWrapper>
                          <ul>
                            <li>총평: {comment.score}</li>
                            <li>코멘트: {comment.comment}</li>
                          </ul>
                        </>
                      )
                      : "faBatteryEmpty..."
                  }
                </div>
              </Comment>
            </div>
          </EvaluationDetailWrapper>
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
