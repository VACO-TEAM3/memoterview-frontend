import React, { useState } from "react";
import styled from "styled-components";

import Header from "../../components/Header";

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

const TotalResultContentTop = styled.div`
  display: grid;
  grid-template-columns: .4fr .6fr;
  grid-gap: 50px;
  padding: 30px;
  height: 50vh;
  background-color: gray;
  box-sizing: border-box;

`;

const TotalResultIntervieweeListWrapper = styled.div`
  height: 100%;
  width: 100%;
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
        <TotalResultContentTop>
          <div style={{ backgroundColor: "red" }}>

          </div>
          <TotalResultIntervieweeListWrapper style={{ backgroundColor: "blue" }}>
            <div>

            </div>
            <button onClick={onIntervieweeAddBtnClick}>ADD INTERVIEWEE MODAL</button>
          </TotalResultIntervieweeListWrapper>

        </TotalResultContentTop>
      </TotalResultContentWrapper>
    </>
  );
}
