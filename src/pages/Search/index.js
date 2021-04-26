import React from "react";
import styled from "styled-components";

import Header from "../../components/Header";
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


const QuestionerWrapper = styled.div`
  display: flex;
  background-color: pink;
`;

const Question = styled.div`
  display: flex;
  background-color: purple;
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: green;
  border: 1px solid white;
`;


export default function Search({ questionList, inputText, iconSize, onFormSubmit, onInputChange }) {
  console.log(questionList, "list");

  return (
    <>
      <Header />
      <SearchWrapper>
        <Main>
          <SearchInputBar iconSize={iconSize} inputText={inputText} onFormSubmit={onFormSubmit} onInputChange={onInputChange}/>
          <ResultWrapper>
            {
              questionList.map(question =>
                <QuestionWrapper>
                  <Interviewer question={question}/>
                  <div>
                    <div>점수: {question.score}</div>
                    <div>답변자: {question.answerer}</div>
                    <div>답변날짜: {question.interviewDate}</div>
                    <div>답변: {question.answer}</div>
                  </div>
                </QuestionWrapper>
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
