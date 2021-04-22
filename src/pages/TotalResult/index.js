import React, { useState } from "react";
import styled from "styled-components";

const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
`;

export default function TotalResult({ onIntervieweeAddBtnClick }) {

  return (
    <>
      <div><button onClick={onIntervieweeAddBtnClick}>UPLOADING MODAL</button></div>
      <div><button onClick={onIntervieweeAddBtnClick}>GETTING PDF </button></div>
    </>
  );
}
