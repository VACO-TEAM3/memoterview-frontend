import React from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import SearchInputBar from "../../components/Search/SearchInputBar";

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

const SearchInputBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  font-size: ${props => props.iconSize};
  /* background-color: yellow; */
`;

const ResultWrapper = styled.div`
  display : flex;
  justify-content: center;
  width: 80%;
  height: 100%;
  background-color: yellow;
`;

export default function Search({ questionList, inputText, iconSize, onFormSubmit, onInputChange }) {

  console.log(questionList, "list");

  return (
    <>
      <Header />
      <SearchWrapper>
        <Main>
          <SearchInputBarWrapper iconSize={iconSize}>
            <SearchInputBar inputText={inputText} onFormSubmit={onFormSubmit} onInputChange={onInputChange}/>
          </SearchInputBarWrapper>

          <ResultWrapper>
            {
              questionList&& questionList.map(question =>
                <>
                  <div>
                    <div>질문: {question.question}</div>
                    <div>질문자: <img src={question.questionerAvatar}></img>{question.questioner}</div>
                  </div>
                  <div>
                    <div>점수: {question.score}</div>
                    <div>답변자: {question.answerer}</div>
                    <div>답변날짜: {question.interviewDate}</div>
                    <div>답변: {question.answer}</div>
                  </div>
                </>
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
