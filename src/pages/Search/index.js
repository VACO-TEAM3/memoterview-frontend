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
  height: 100vh;
  width: 100%;
  /* background-color: blue; */
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
  align-items: center;
  width: 60%;
  height: 100%;
  overflow-y: scroll;
  /* background-color: yellow; */
`;

const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 0 0.5vw; */
  width: 90%;
  /* background-color: purple; */
  border: 1px solid black;
  border-radius: 10px;
`;

const Total = styled.div`

`;

export default function Search({ searchList, inputText, iconSize, onFormSubmit, onInputChange }) {
  console.log(searchList, "list");

  return (
    <Total>
      <Header />
      <SearchWrapper>
        <Main>
          <SearchInputBar inputText={inputText} onFormSubmit={onFormSubmit} onInputChange={onInputChange}/>
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
    </Total>
  );
}

// Search.defaultProps = {
//   iconSize: "20px",
// };
