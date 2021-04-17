import React from "react";
import styled from "styled-components";

import UserIcon from "../UserIcon";

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const UserName = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
`;

const UserEmail = styled.div`
  margin-top: 5px;
  font-size: 1rem;
`;

export default function UserInfo({ userInfo }) {
  return (
    <UserInfoWrapper>
      <UserIcon />
      <UserName>{userInfo.userName}</UserName>
      <UserEmail>{userInfo.userEmail}</UserEmail>
    </UserInfoWrapper>
  );
}
