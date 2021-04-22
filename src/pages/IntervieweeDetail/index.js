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
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
  height: 15vh;
  background-color: yellow;
`;

const Navbar = styled.div`
  display: flex;
  width: 100%;
  height: 5vh;
  background-color: pink;

`;

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 85vh;
  background-color: green;
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
          <UserIcon></UserIcon>
        </Header>

        <Main />

      </MainLayoutWrapper>
    </>
  );
}
