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
  justify-content: center;
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
  justify-content: center;
  align-items: center;
  width: 85%;
  background-color: hotpink;
`;

export default function IntervieweeDetail() {
  const userInfo = {
    userName: "ri",
    userEmail: "asdfadfaf@sdfaf.com",
  };

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
          <EvaluationDetailWrapper />
        </Main>

      </MainLayoutWrapper>
    </>
  );
}
