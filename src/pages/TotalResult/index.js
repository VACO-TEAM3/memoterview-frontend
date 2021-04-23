import React, { useState } from "react";
import styled from "styled-components";

import Header from "../../components/Header";

const HeaderNav = styled.div`
  font-size: 1.5rem;
`;

export default function TotalResult({ onIntervieweeAddBtnClick }) {

  return (
    <>
      <Header>
        <HeaderNav>Interviewee</HeaderNav>
        <HeaderNav>Interviewee</HeaderNav>
      </Header>
      <div><button onClick={onIntervieweeAddBtnClick}>ADD INTERVIEWEE MODAL</button></div>
    </>
  );
}
