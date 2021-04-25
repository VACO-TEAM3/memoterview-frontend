import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

import Header from "../../components/Header";

const Main = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  /* background-color: blue; */
`;

const SearchWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  /* background-color: pink; */
`;

const SearchInputBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  /* background-color: yellow; */
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 20%;
  margin-top: 5vh;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  font-size: ${props => props.iconSize};
`;

const SearchInputBar = styled.input`
  width: 80%;
  height: 70%;
  margin: 1vw;
  border: none;
  outline: none;
  font-size: 30px;
`;

export default function Search({ iconSize }) {
  return (
    <>
      <Header />
      <SearchWrapper>
        <Main>
          <SearchInputBarWrapper>
            <SearchInputContainer iconSize={iconSize}>
              <FontAwesomeIcon iconSize={iconSize} icon={faSearch}/>
              <SearchInputBar/>
            </SearchInputContainer>
          </SearchInputBarWrapper>
        </Main>
      </SearchWrapper>
    </>
  );
}

Search.defaultProps = {
  iconSize: "30px",
};
