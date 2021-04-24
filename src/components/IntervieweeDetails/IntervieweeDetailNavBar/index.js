import { faAngleLeft, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
  margin-bottom: 2vh;
  background-color: pink;
`;

const GoBackButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${props => props.size};
  height: ${props => props.size};
  font-size: ${props => props.iconSize};
  margin-left: 2vw;
  cursor: pointer;
`;

const PdfBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${props => props.size};
  height: ${props => props.size};
  font-size: ${props => props.iconSize};
  margin-right: 1.5vw;
  cursor: pointer;
`;

function intervieweeDetailNavBar({ shouldHover, backgroundColor, iconColor, size, iconSize, onGeneratePdfBtnClick, onGoBackButtonClick }) {
  return (
    <Navbar>
      <GoBackButton
        shouldHover={shouldHover}
        backgroundColor="none"
        iconSize={iconSize}
        size={size}
        onClick={onGoBackButtonClick}
      >
        <FontAwesomeIcon iconSize={iconSize} shouldHover={shouldHover} color={iconColor} icon={faAngleLeft}/>
      </GoBackButton>

      <PdfBtn
        shouldHover={shouldHover}
        backgroundColor={backgroundColor}
        iconSize="40px"
        size={size}
        onClick={onGeneratePdfBtnClick}
      >
        <FontAwesomeIcon shouldHover={shouldHover} color={iconColor} icon={faFileDownload}/>
      </PdfBtn>
    </Navbar>
  );
}

intervieweeDetailNavBar.defaultProps = {
  // hover -> blue
  backgroundColor: "none",
  iconColor: "black",
  size: "50px",
  iconSize: "50px",
};

export default intervieweeDetailNavBar;
