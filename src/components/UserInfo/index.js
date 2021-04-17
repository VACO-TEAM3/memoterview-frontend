import React from "react";
import styled from "styled-components";

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default function UserInfo() {
  return (
    <UserInfoWrapper>
      <h1>userInfo</h1>
    </UserInfoWrapper>
  );
}
