import React from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import Interviewee from "../../components/SearchQuestions/Interviewee";
import Interviewer from "../../components/SearchQuestions/Interviewer";
import SearchInputBar from "../../components/SearchQuestions/SearchInputBar";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: blue;
`;

const SearchWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  /* background-color: pink; */
`;

const ResultWrapper = styled.div`
  display : flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  background-color: yellow;
`;

const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vh 4vw;
  background-color: purple;
  border: 1px solid white;
`;


export default function Search({ searchList, inputText, iconSize, onFormSubmit, onInputChange }) {
  console.log(searchList, "list");

  return (
    <>
      <Header />
      <SearchWrapper>
        <Main>
          <SearchInputBar iconSize={iconSize} inputText={inputText} onFormSubmit={onFormSubmit} onInputChange={onInputChange}/>
          <ResultWrapper>
            {
              searchList.map(searchResult =>
                <SearchResultWrapper>
                  <Interviewer searchResult={searchResult}/>
                  <Interviewee searchResult={searchResult} />
                </SearchResultWrapper>
              )
            }
          </ResultWrapper>
        </Main>
      </SearchWrapper>
    </>
  );
}

Search.defaultProps = {
  iconSize: "30px",
};
