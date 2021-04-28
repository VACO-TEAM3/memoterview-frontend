import React from "react";
import styled from "styled-components";

import UserIcon from "../UserIcon";

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.Solitude};
  padding-bottom: 30px;
`;

const UserName = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
`;

const UserEmail = styled.div`
  margin: 5px 0 20px 0;
  font-size: 1rem;
`;

function UserInfo({ userInfo }) {
  return (
    <UserInfoWrapper>
      <UserIcon avatar={userInfo.avatar} avatarSize="60px"/>
      <UserName>{userInfo.userName}</UserName>
      <UserEmail>{userInfo.userEmail}</UserEmail>
    </UserInfoWrapper>
  );
}

export default React.memo(UserInfo);
