import React, { useState } from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import TotalResultContentTop from "../../components/TotalResultContentTop";

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
`;

const TotalResultContentWrapper = styled.div`
  margin: 4.5rem auto 0;
  min-width: 1200px;
  max-width: 1600px;
  box-sizing: border-box;
`;

export default function TotalResult({ onIntervieweeAddBtnClick }) {

  return (
    <>
      <Header>
        <HeaderNav>Interviewee</HeaderNav>
        <HeaderNav>Search</HeaderNav>
        <HeaderNav>Logout</HeaderNav>
      </Header>
      <TotalResultContentWrapper>
        <TotalResultContentTop onIntervieweeAddBtnClick={onIntervieweeAddBtnClick}/>
      </TotalResultContentWrapper>
    </>
  );
}
