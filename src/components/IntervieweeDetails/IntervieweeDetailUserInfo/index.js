import React from "react";
import styled from "styled-components";

import UserIcon from "../../UserIcon";

const UserInfo = styled.div`
  display: flex;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1vw;
`;

const UserIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2vw;
`;

const UserName = styled.div`
  font-size: 1.2rem;
  margin: 0.5vh;
`;

const UserEmail = styled.div`
  font-size: 1rem;
  margin: 0.5vh;
`;

function intervieweeDetailUserInfo({ userInfo }) {
  return (
    <UserInfo>
      <UserIconWrapper>
        <UserIcon />
      </UserIconWrapper>
      <UserInfoWrapper>
        <UserName>{userInfo.name}</UserName>
        <UserEmail>{userInfo.email}</UserEmail>
      </UserInfoWrapper>
    </UserInfo>
  );
}

export default intervieweeDetailUserInfo;
