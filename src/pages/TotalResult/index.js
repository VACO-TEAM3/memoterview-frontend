import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Header from "../../components/Header";
import TotalResultContentTop from "../../components/TotalResultContentTop";
import TotalResultList from "../../components/TotalResultList";

const HeaderNav = styled.div`
  margin: 0 40px;
  font-size: 1.5rem;
  cursor: pointer;

  &:first-child {
    margin-left: 80px;
  }

  &:last-child {
    margin-left: auto;
    margin-right: 80px;
    text-align: end;
  }

  &:hover {
    color: ${({ theme }) => theme.Aero};
  }

  a {
    text-decoration: none;
    &:link {
      color: black;
    }
    &:visited {
      color: black;
    }
    &:hover {
      color: ${({ theme }) => theme.Aero};
    }
  }
`;

const TotalResultContentWrapper = styled.div`
  margin: 4.5rem auto 0;
  min-width: 1200px;
  max-width: 1600px;
  box-sizing: border-box;
`;

export default function TotalResult({
  interviewees,
  resultInterviewees,
  projectId,
  onIntervieweeAddBtnClick,
  onIntervieweeDeleteBtnClick,
  onIntervieweeInviteBtnClick,
  onInterviewRoomEnterBtnClick,
  onLogoutClick,
  onFilterBtnClick,
  filters,
}) {
  return (
    <>
      <Header>
        <HeaderNav>
          <Link to={"/projects"}>Interviews</Link>
        </HeaderNav>
        <HeaderNav>
          <Link to={`/projects/${projectId}/search`}>Search</Link>
        </HeaderNav>
        <HeaderNav onClick={onLogoutClick}>Logout</HeaderNav>
      </Header>
      <TotalResultContentWrapper>
        <TotalResultContentTop
          interviewees={interviewees}
          onIntervieweeAddBtnClick={onIntervieweeAddBtnClick}
          onIntervieweeDeleteBtnClick={onIntervieweeDeleteBtnClick}
          onIntervieweeInviteBtnClick={onIntervieweeInviteBtnClick}
          onInterviewRoomEnterBtnClick={onInterviewRoomEnterBtnClick}
        />
        <TotalResultList interviewees={resultInterviewees} filters={filters} onFilterBtnClick={onFilterBtnClick}/>
      </TotalResultContentWrapper>
    </>
  );
}
