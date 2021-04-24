import React from "react";
import styled from "styled-components";

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 5vh;
`;

function intervieweeDetailNavBar({ onGeneratePdfBtnClick, onGoBackButtonClick }) {
  return (
    <Navbar>
      <button onClick={onGoBackButtonClick}>뒤로가기</button>
      <button onClick={onGeneratePdfBtnClick}>pdf</button>
    </Navbar>
  );
}

export default intervieweeDetailNavBar;
