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

export default function UserInfo() {
  return (
    <UserInfoWrapper>
      <UserIcon />
      
    </UserInfoWrapper>
  );
}
