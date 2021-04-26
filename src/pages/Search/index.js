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
  width: 100%;
  height: 100vh;
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const ResultWrapper = styled.div`
  display : flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: 100%;
  overflow-y: scroll;
`;

const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 5px;
`;

const NoSearchResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 50%;
  font-size: 2vmax;
`;

export default function Search({ searchList, inputText, onFormSubmit, onInputChange }) {
  return (
    <>
      <Header />
      <SearchWrapper>
        <Main>
          <SearchInputBar inputText={inputText} onFormSubmit={onFormSubmit} onInputChange={onInputChange} />
          <ResultWrapper>
            {
              searchList.length
                ? searchList.map((searchResult) =>
                  <SearchResultWrapper>
                    <Interviewer searchResult={searchResult} />
                    <Interviewee searchResult={searchResult} />
                  </SearchResultWrapper>
                )
                : <NoSearchResult>No Search Result</NoSearchResult>
            }
          </ResultWrapper>
        </Main>
      </SearchWrapper>
    </>
  );
}
